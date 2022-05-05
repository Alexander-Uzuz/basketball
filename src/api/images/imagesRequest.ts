import { IDataPhoto } from './IImagesRequest';
import { baseRequest } from "api/baseRequest";
import { BASE_URL } from "api/baseRequest";
import { post } from 'api/baseRequest';

export const downloadImage = (data:IDataPhoto) => {
    return post('/api/Image/SaveImage', data.formData, data.token)
}