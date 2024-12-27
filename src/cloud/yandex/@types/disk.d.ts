type TResource = {
  resource_id: string;
  name: string;
  path: string;
  created: string;
  modified: string;
  revision: number;
  comment_ids: {
    private_resource: string;
    public_resource: string;
  };
};

type TFileResource = TResource & {
  type: 'file';
  antivirus_status: 'clean';
  md5: string;
  media_type: 'text';
  mime_type: 'text/plain';
  file: string;
  preview: string;
  sha256: string;
  size: number;
};

type TDirResource = TResource & {
  type: 'dir';
  _embedded: {
    sort: '';
    items: TDiskResource[];
    limit: number;
    offset: number;
    path: string;
    total: number;
  };
};

type TDiskResource = TFileResource | TDirResource;

type TDiskLink = {
  method: string;
  href: string;
};

type TDiskError = {
  error: string;
  message: string;
  description: string;
};
