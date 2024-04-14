import { UrlOptions } from "src/models/options/url-options";

export class AvatarUtility{
    static buildAvatarUrl(avatarUrl: string){
        return UrlOptions.BaseUrl + avatarUrl;
    }
}