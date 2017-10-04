declare global {
    namespace Express {
        interface Request extends S3Multer.Request { }

        namespace Multer {
            interface File extends S3Multer.File { }
        }
    }

    interface BoardPosition {
        x: number;
        y: number;
    }
}

import { S3 } from "aws-sdk";

declare namespace S3Multer {
    interface Request { }
    interface File {
        bucket: S3.BucketName;
        key: S3.ObjectKey;
        acl: S3.BucketCannedACL;
        contentType: S3.ContentType;
        contentDisposition: S3.ContentDisposition;
        storageClass: S3.StorageClass;
        serverSideEncryption: S3.ServerSideEncryption;
        metadata: S3.Metadata;
        location: S3.Location;
        etag: S3.ETag;
    }
}

declare module "redis" {
    export interface RedisClient extends NodeJS.EventEmitter {
        set(key: string, value: string): Promise<string>;
        getAsync(key: string): Promise<string>;
        zrangeAsync(key: string, start: number, end: number, withScores: "withscores");
        exists(key: string, value: string): Promise<number>;
    }
}
