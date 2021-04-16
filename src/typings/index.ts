export interface ImageLabel {
  Name: string;
  FirstCategory: string;
  SecondCategory: string;
  Confidence: number;
}

export interface Image {
  uid: string;
  url: string;
  labels: string;
  description?: string;
}
