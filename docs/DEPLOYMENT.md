# Deploying VYOMA (web + API) to Vercel

The repo deploys as **one Vercel project with two services** (see `vercel.json`):

| Service | Folder | What it does |
|---|---|---|
| `web` | `apps/web` (Nuxt) | The website. Everything under `/` |
| `api` | `apps/api` (NestJS) | Everything under `/api`: the Book a Demo / Ask More forms, the chat assistant, the admin panel |

Because both share one domain, the browser talks to `/api/...` on the same site (no CORS problems).

## 1. What works without a database, and what does not

| Feature | Needs the API | Needs MongoDB | Needs a Gemini key |
|---|---|---|---|
| Landing page, solution pages, sitemap, SEO | no | no | no |
| **Book a Demo / Ask More forms** | yes | **yes** | no |
| Admin panel (`/admin`) to read the leads | yes | yes | no |
| **Chat assistant** | yes | no | **yes** |

So **yes: the forms only work in production once the API is deployed and connected to a real MongoDB.** Until then the form shows its error state, because the API has no database to save into (the default `mongodb://127.0.0.1` address only exists on a developer's laptop).

## 2. Create the MongoDB database (MongoDB Atlas, free tier is enough)

1. Sign up at <https://www.mongodb.com/cloud/atlas> and create a **free (M0) cluster**. Pick the region closest to your visitors (for India, Mumbai).
2. **Database Access** > *Add New Database User*. Choose a username and a long random password. Role: *Read and write to any database*. Save the password somewhere safe.
3. **Network Access** > *Add IP Address* > **Allow access from anywhere (`0.0.0.0/0`)**. Vercel's servers do not have a fixed IP, so Atlas cannot be locked to one. The database password is what protects it.
4. **Database** > *Connect* > *Drivers*. Copy the connection string. It looks like:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/vyoma_website?retryWrites=true&w=majority`
   Put your real password in place of `PASSWORD` (URL-encode special characters), and make sure the database name `vyoma_website` is in the path as shown.

## 3. Create the admin user (once)

The leads are read in the admin panel at `/admin`, which needs an admin account. Create it by running the seed script from your laptop against Atlas:

```bash
cd apps/api
MONGODB_URI="<your Atlas connection string>" \
SEED_ADMIN_EMAIL="you@yourcompany.com" \
SEED_ADMIN_PASSWORD="<a strong password>" \
npx pnpm run db:seed
```

Do not skip the two `SEED_ADMIN_*` values: without them the seed uses the default login from the README, which is public.

The seed only **creates** the admin if it does not exist yet. Running it again with a different password does **not** change an existing admin's password. If you need to reset it, delete the document in the `admins` collection in Atlas and run the seed again.

## 4. Environment variables in Vercel

Vercel project > **Settings > Environment Variables**. Add these for **Production** (and Preview if you want previews to work):

| Name | Value | Notes |
|---|---|---|
| `MONGODB_URI` | the Atlas connection string from step 2 | Required for the forms |
| `JWT_SECRET` | a long random string (`openssl rand -hex 32`) | Required, signs admin logins |
| `CORS_ORIGIN` | `https://vyoma.aero` | Your live domain |
| `NUXT_PUBLIC_SITE_URL` | `https://vyoma.aero` | Canonical URLs, sitemap, robots.txt |
| `GEMINI_API_KEY` | key from <https://aistudio.google.com/apikey> | Turns the chat on. Leave unset and the chat button stays hidden |
| `GEMINI_MODEL` | `gemini-2.5-flash` | Optional. Change if you want another Gemini model |

Never put the Gemini key or the database password in the code or in a `NUXT_PUBLIC_*` variable: those are visible in the browser. The chat is safe because the browser only talks to `/api/chat`; the API holds the key and calls Gemini.

Do **not** set `API_INTERNAL_URL` by hand: Vercel injects it from the service binding in `vercel.json`.

## 4b. Get the Gemini key (for the chat assistant)

1. Open <https://aistudio.google.com/apikey> and sign in with a Google account (use a company account, not a personal one, so the key does not belong to one person).
2. Accept the terms if asked.
3. Click **Create API key**. When it asks for a project, choose **Create API key in new project** (or pick an existing Google Cloud project).
4. The key appears (it starts with `AIza`). Click the copy icon. You can reopen this page later to copy it again.
5. In Vercel: **Settings > Environment Variables > Add**, name `GEMINI_API_KEY`, paste the key, environment **Production**, **Save**. Then redeploy.
6. Check `https://<your-domain>/api/chat/status`: it should say `{"enabled":true}`. Then try the chat on the site.

Before a public launch:
- The free tier has low limits and may use your conversations to improve Google's products. For a real launch, open the key's project in Google AI Studio, choose **Set up billing**, and add a budget alert in Google Cloud (Billing > Budgets & alerts) so a bot cannot run up a bill.
- In Google Cloud Console > APIs & Services > Credentials, open the key and under *API restrictions* choose **Restrict key > Generative Language API**.
- If the key is ever pasted somewhere public, delete it in AI Studio and create a new one.

## 4c. Admin panel: reading the leads

Everything submitted through **Book a Demo** and **Ask More** is stored in MongoDB and listed in the admin panel.

1. Open `https://<your-domain>/admin` and sign in with the admin email and password you used when seeding (step 3).
2. Open **Leads**. Each row shows when it arrived, who sent it, their company, the type (Book a demo or Ask more) and its status.
3. Click **Details** on a row to see the organisation type, timing, topic and message.
4. Use the status dropdown (NEW, CONTACTED, CLOSED) to track follow-up. Search and the two filters narrow the list. **Export CSV** downloads what is currently shown, for sharing with the team.

The same data is in Atlas under *Browse Collections* > `vyoma_website` > `leadsubmissions`.

## 5. Deploy

1. Merge to `main`. Vercel builds both services automatically.
2. After changing environment variables, **redeploy** (Deployments > the latest > *Redeploy*), because variables are read at build/start.
3. Attach the domain: see the domain steps in the main handover notes (Settings > Domains, then DNS at the registrar).

## 6. Check it works

1. `https://<your-domain>/api/health` returns `{"status":"ok",...}`.
2. `https://<your-domain>/api/chat/status` returns `{"enabled":true}` once the Gemini key is set.
3. Open the site, press **Ask VYOMA** (bottom left) and ask a question.
4. Fill in **Book a Demo** and submit. You should see the success message.
5. Open `https://<your-domain>/admin`, sign in, and open **Leads**: the submission is there. (Or in Atlas: *Browse Collections* > `vyoma_website` > `leadsubmissions`.)

## 7. Good to know

- **Free Gemini keys have rate limits.** Heavy traffic can return "could not answer right now". The widget handles that gracefully. For a public launch use a billed key, and set a budget alert in Google AI Studio.
- The API limits chat to 12 questions per minute and the forms to 5 submissions per minute per visitor, to keep bots from burning the key or filling the database.
- The assistant only knows what is written in `apps/api/src/modules/chat/chat-knowledge.ts`. When the product changes, update that file together with `apps/web/app/data/solutionDetails.ts`.
- The forms store leads but do not send an email. Check the admin panel, or ask for an email notification to be added.
- Back up: Atlas M0 has no automatic backups. Export the `leadsubmissions` collection from time to time, or upgrade the cluster.
