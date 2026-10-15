export interface NavLink {
  label: string
  href: string
  description?: string
  children?: NavLink[]
}

export interface NavGroup {
  label: string
  items: NavLink[]
}
