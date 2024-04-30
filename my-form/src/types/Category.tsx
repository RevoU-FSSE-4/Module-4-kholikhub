export default interface Category{
    name: string;
    data: any;
    setName: (values: string) => void;
    setData: (values: any) => void;
  }