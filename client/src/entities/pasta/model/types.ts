interface File {
  id: number;
  url: string;
  mimetype: string;
  size: number;
}

export interface Pasta {
  id: number;
  file?: File;
  text?: string;
  keywords: string;
}
