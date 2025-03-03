import type { Entity } from '../types';
import type { ReleaseAction } from './release-actions';
import type { UserInfo } from '../types';
import { errors } from '@strapi/utils';
import type { SanitizedAdminUser } from '@strapi/admin/strapi-admin';

export interface Release extends Entity {
  name: string;
  releasedAt: string | null;
  scheduledAt: string | null;
  actions: ReleaseAction[];
}

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export interface ReleaseDataResponse extends Omit<Release, 'actions'> {
  actions: { meta: { count: number } };
  createdBy: SanitizedAdminUser;
}

export interface ReleaseForContentTypeEntryDataResponse extends Omit<Release, 'actions'> {
  action: ReleaseAction;
}

/**
 * GET /content-releases/ - Get all releases
 */
export declare namespace GetReleases {
  export interface Request {
    state: {
      userAbility: {};
    };
    query?: Partial<Pick<Pagination, 'page' | 'pageSize'>>;
  }

  export interface Response {
    data: ReleaseDataResponse[];
    meta: {
      pagination?: Pagination;
    };
    error?: errors.ApplicationError;
  }
}

/**
 * GET /content-releases/ - Get all releases for a given entry
 */
export declare namespace GetContentTypeEntryReleases {
  export interface Request {
    state: {
      userAbility: {};
    };
    query: {
      contentTypeUid: ReleaseAction['contentType'];
      entryId: ReleaseAction['entry']['id'];
      hasEntryAttached?: boolean;
    };
  }

  export interface Response {
    data: ReleaseForContentTypeEntryDataResponse[];
    error?: errors.ApplicationError;
  }
}

/**
 * GET /content-releases/:id - Get a single release
 */
export declare namespace GetRelease {
  export interface Request {
    state: {
      userAbility: {};
    };
    params: {
      id: Release['id'];
    };
  }

  export interface Response {
    data: ReleaseDataResponse;
    error?: errors.ApplicationError | errors.NotFoundError;
  }
}

/**
 * POST /content-releases/ - Create a release
 */
export declare namespace CreateRelease {
  export interface Request {
    state: {
      user: UserInfo;
    };
    body: {
      name: string;
      scheduledAt?: Date;
    };
  }

  export interface Response {
    data: ReleaseDataResponse;
    error?: errors.ApplicationError | errors.ValidationError;
  }
}

/**
 * PUT /content-releases/:id - Update a release
 */
export declare namespace UpdateRelease {
  export interface Request {
    state: {
      user: UserInfo;
    };
    params: {
      id: Release['id'];
    };
    body: {
      name: string;
      // When editing a release, scheduledAt always need to be explicitly sended, so it can be null to unschedule it
      scheduledAt?: Date | null;
    };
  }

  export interface Response {
    data: ReleaseDataResponse;
    error?: errors.ApplicationError | errors.ValidationError;
  }
}

/**
 * DELETE /content-releases/:id - Delete a release
 */
export declare namespace DeleteRelease {
  export interface Request {
    state: {
      user: UserInfo;
    };
    params: {
      id: Release['id'];
    };
  }

  export interface Response {
    data: ReleaseDataResponse;
    error?: errors.ApplicationError | errors.NotFoundError;
  }
}

/**
 * POST /content-releases/:releaseId/publish - Publish a release
 */
export declare namespace PublishRelease {
  export interface Request {
    state: {
      user: UserInfo;
    };
    params: {
      id: Release['id'];
    };
  }

  export interface Response {
    data: ReleaseDataResponse;
    meta: {
      totalEntries: number;
      totalPublishedEntries: number;
      totalUnpublishedEntries: number;
    };
    error?: errors.ApplicationError | errors.ValidationError;
  }
}
