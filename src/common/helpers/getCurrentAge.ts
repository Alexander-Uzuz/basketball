export const get_current_age = (date:string) => {
    const dateOfBirth:any = new Date(date);
    return ((new Date().getTime() - dateOfBirth) / (24 * 3600 * 365.25 * 1000)) | 0;
  }