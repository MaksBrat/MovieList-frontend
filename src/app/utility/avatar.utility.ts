import { UrlOptions } from "src/models/UrlOptions";

export class AvatarUtility{
    static buildAvatarUrl(avatarUrl: string){
        return UrlOptions.BaseUrl + avatarUrl;
    }
}