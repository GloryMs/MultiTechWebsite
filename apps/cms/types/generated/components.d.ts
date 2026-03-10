import type { Schema, Struct } from '@strapi/strapi';

export interface AboutCoreValue extends Struct.ComponentSchema {
  collectionName: 'components_about_core_values';
  info: {
    description: 'A company core value with an icon identifier';
    displayName: 'Core Value';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon_name: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_about_team_members';
  info: {
    description: 'A leadership team member';
    displayName: 'Team Member';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'>;
    role: Schema.Attribute.String;
  };
}

export interface AboutTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_about_timeline_items';
  info: {
    description: 'A single milestone in the company timeline';
    displayName: 'Timeline Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    year: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.core-value': AboutCoreValue;
      'about.team-member': AboutTeamMember;
      'about.timeline-item': AboutTimelineItem;
    }
  }
}
