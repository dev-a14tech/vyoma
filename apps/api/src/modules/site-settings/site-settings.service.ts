import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SiteSetting, SiteSettingDocument } from '../../database/schemas/site-setting.schema.js';

@Injectable()
export class SiteSettingsService {
  constructor(@InjectModel(SiteSetting.name) private readonly model: Model<SiteSettingDocument>) {}

  async findAll() {
    const rows = await this.model.find();
    return rows.reduce<Record<string, unknown>>((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
  }

  async upsert(key: string, value: unknown) {
    return this.model.findOneAndUpdate({ key }, { $set: { value } }, { new: true, upsert: true });
  }
}
