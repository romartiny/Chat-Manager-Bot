import { BaseLogger } from "./logger/BaseLogger";
import * as Responses from './Responses';
import * as MethodsProps from './MethodsProps';
export interface VKApiOptions {
    lang?: string | number;
    testMode?: number;
    logger?: BaseLogger;
    token?: string;
    timeout?: number;
    requestsPerSecond?: number;
    useQueue?: boolean;
}
export declare class VKApi {
    private _lang;
    private _testMode;
    private _logger;
    private _queue;
    private _timeout;
    private _token;
    constructor(options: VKApiOptions);
    call(method: string, params: Object): Promise<any>;
    /**
     * Makes api call and if there was
     * server-side error or requests limit was reached
     * repeats the call after some timeout
     */
    callWithRetry(method: string, params: Object): Promise<any>;
    private handleResponse(method, params, body, response, err, resolve, reject);
    private filterParams(params);
    /**
     * Returns detailed information on users.
     *
     * @param {{
     *   user_ids: (string[]|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.UsersGetResponse>}
     */
    usersGet(params: MethodsProps.UsersGetParams): Promise<Responses.UsersGetResponse>;
    /**
     * Returns a list of users matching the search criteria.
     *
     * @param {{
     *   q: (string|undefined),
     *   sort: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   fields: (string[]|undefined),
     *   city: (number|undefined),
     *   country: (number|undefined),
     *   hometown: (string|undefined),
     *   university_country: (number|undefined),
     *   university: (number|undefined),
     *   university_year: (number|undefined),
     *   university_faculty: (number|undefined),
     *   university_chair: (number|undefined),
     *   sex: (number|undefined),
     *   status: (number|undefined),
     *   age_from: (number|undefined),
     *   age_to: (number|undefined),
     *   birth_day: (number|undefined),
     *   birth_month: (number|undefined),
     *   birth_year: (number|undefined),
     *   online: (boolean|undefined),
     *   has_photo: (boolean|undefined),
     *   school_country: (number|undefined),
     *   school_city: (number|undefined),
     *   school_class: (number|undefined),
     *   school: (number|undefined),
     *   school_year: (number|undefined),
     *   religion: (string|undefined),
     *   interests: (string|undefined),
     *   company: (string|undefined),
     *   position: (string|undefined),
     *   group_id: (number|undefined),
     *   from_list: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.UsersSearchResponse>}
     */
    usersSearch(params: MethodsProps.UsersSearchParams): Promise<Responses.UsersSearchResponse>;
    /**
     * Returns information whether a user installed the application.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.UsersIsAppUserResponse>}
     */
    usersIsAppUser(params: MethodsProps.UsersIsAppUserParams): Promise<Responses.UsersIsAppUserResponse>;
    /**
     * Returns a list of IDs of users and communities followed by the user.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   extended: (boolean|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.UsersGetSubscriptionsResponse>}
     */
    usersGetSubscriptions(params: MethodsProps.UsersGetSubscriptionsParams): Promise<Responses.UsersGetSubscriptionsResponse>;
    /**
     * Returns a list of IDs of followers of the user in question, sorted by date added, most recent first.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.UsersGetFollowersResponse>}
     */
    usersGetFollowers(params: MethodsProps.UsersGetFollowersParams): Promise<Responses.UsersGetFollowersResponse>;
    /**
     * Reports (submits a complain about) a user.
     *
     * @param {{
     *   user_id: (number),
     *   type: (string),
     *   comment: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    usersReport(params: MethodsProps.UsersReportParams): Promise<Responses.OkResponse>;
    /**
     * Indexes current user location and returns nearby users.
     *
     * @param {{
     *   latitude: (number),
     *   longitude: (number),
     *   accuracy: (number|undefined),
     *   timeout: (number|undefined),
     *   radius: (number|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.UsersGetNearbyResponse>}
     */
    usersGetNearby(params: MethodsProps.UsersGetNearbyParams): Promise<Responses.UsersGetNearbyResponse>;
    /**
     * Checks a user's phone number for correctness.
     *
     * @param {{
     *   phone: (string),
     *   client_id: (number|undefined),
     *   client_secret: (string),
     *   auth_by_phone: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    authCheckPhone(params: MethodsProps.AuthCheckPhoneParams): Promise<Responses.OkResponse>;
    /**
     * Registers a new user by phone number.
     *
     * @param {{
     *   first_name: (string),
     *   last_name: (string),
     *   birthday: (string),
     *   client_id: (number),
     *   client_secret: (string),
     *   phone: (string),
     *   password: (string|undefined),
     *   test_mode: (boolean|undefined),
     *   voice: (boolean|undefined),
     *   sex: (number|undefined),
     *   sid: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AuthSignupResponse>}
     */
    authSignup(params: MethodsProps.AuthSignupParams): Promise<Responses.AuthSignupResponse>;
    /**
     * Completes a user's registration (begun with the [vk.com/dev/auth.signup|auth.signup] method) using an authorization code.
     *
     * @param {{
     *   client_id: (number),
     *   client_secret: (string),
     *   phone: (string),
     *   code: (string),
     *   password: (string|undefined),
     *   test_mode: (boolean|undefined),
     *   intro: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AuthConfirmResponse>}
     */
    authConfirm(params: MethodsProps.AuthConfirmParams): Promise<Responses.AuthConfirmResponse>;
    /**
     * Allows to restore account access using a code received via SMS. " This method is only available for apps with [vk.com/dev/auth_direct|Direct authorization] access. "
     *
     * @param {{
     *   phone: (string),
     *   last_name: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AuthRestoreResponse>}
     */
    authRestore(params: MethodsProps.AuthRestoreParams): Promise<Responses.AuthRestoreResponse>;
    /**
     * Returns a list of posts on a user wall or community wall.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   domain: (string|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   filter: (string|undefined),
     *   extended: (boolean|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.WallGetResponse>}
     */
    wallGet(params: MethodsProps.WallGetParams): Promise<Responses.WallGetResponse>;
    /**
     * Allows to search posts on user or community walls.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   domain: (string|undefined),
     *   query: (string|undefined),
     *   owners_only: (boolean|undefined),
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   extended: (boolean|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.WallSearchResponse>}
     */
    wallSearch(params: MethodsProps.WallSearchParams): Promise<Responses.WallSearchResponse>;
    /**
     * Creates an empty photo album.
     *
     * @param {{
     *   title: (string),
     *   group_id: (number|undefined),
     *   description: (string|undefined),
     *   privacy_view: (string[]|undefined),
     *   privacy_comment: (string[]|undefined),
     *   upload_by_admins_only: (boolean|undefined),
     *   comments_disabled: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosCreateAlbumResponse>}
     */
    photosCreateAlbum(params: MethodsProps.PhotosCreateAlbumParams): Promise<Responses.PhotosCreateAlbumResponse>;
    /**
     * Edits information about a photo album.
     *
     * @param {{
     *   album_id: (number),
     *   title: (string|undefined),
     *   description: (string|undefined),
     *   owner_id: (number|undefined),
     *   privacy_view: (string[]|undefined),
     *   privacy_comment: (string[]|undefined),
     *   upload_by_admins_only: (boolean|undefined),
     *   comments_disabled: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosEditAlbum(params: MethodsProps.PhotosEditAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of a user's or community's photo albums.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   album_ids: (number[]|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   need_system: (boolean|undefined),
     *   need_covers: (boolean|undefined),
     *   photo_sizes: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetAlbumsResponse>}
     */
    photosGetAlbums(params: MethodsProps.PhotosGetAlbumsParams): Promise<Responses.PhotosGetAlbumsResponse>;
    /**
     * Returns a list of a user's or community's photos.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   album_id: (string|undefined),
     *   photo_ids: (string[]|undefined),
     *   rev: (boolean|undefined),
     *   extended: (boolean|undefined),
     *   feed_type: (string|undefined),
     *   feed: (number|undefined),
     *   photo_sizes: (boolean|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetResponse>}
     */
    photosGet(params: MethodsProps.PhotosGetParams): Promise<Responses.PhotosGetResponse>;
    /**
     * Returns the number of photo albums belonging to a user or community.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   group_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetAlbumsCountResponse>}
     */
    photosGetAlbumsCount(params: MethodsProps.PhotosGetAlbumsCountParams): Promise<Responses.PhotosGetAlbumsCountResponse>;
    /**
     * Returns information about photos by their IDs.
     *
     * @param {{
     *   photos: (string[]),
     *   extended: (boolean|undefined),
     *   photo_sizes: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetByIdResponse>}
     */
    photosGetById(params: MethodsProps.PhotosGetByIdParams): Promise<Responses.PhotosGetByIdResponse>;
    /**
     * Returns the server address for photo upload.
     *
     * @param {{
     *   album_id: (number|undefined),
     *   group_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetUploadServerResponse>}
     */
    photosGetUploadServer(params: MethodsProps.PhotosGetUploadServerParams): Promise<Responses.PhotosGetUploadServerResponse>;
    /**
     * Returns the server address for owner cover upload.
     *
     * @param {{
     *   group_id: (number|undefined),
     *   crop_x: (number|undefined),
     *   crop_y: (number|undefined),
     *   crop_x2: (number|undefined),
     *   crop_y2: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetOwnerCoverPhotoUploadServerResponse>}
     */
    photosGetOwnerCoverPhotoUploadServer(params: MethodsProps.PhotosGetOwnerCoverPhotoUploadServerParams): Promise<Responses.PhotosGetOwnerCoverPhotoUploadServerResponse>;
    /**
     * Returns an upload server address for a profile or community photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetOwnerPhotoUploadServerResponse>}
     */
    photosGetOwnerPhotoUploadServer(params: MethodsProps.PhotosGetOwnerPhotoUploadServerParams): Promise<Responses.PhotosGetOwnerPhotoUploadServerResponse>;
    /**
     * Returns an upload link for chat cover pictures.
     *
     * @param {{
     *   chat_id: (number),
     *   crop_x: (number|undefined),
     *   crop_y: (number|undefined),
     *   crop_width: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetChatUploadServerResponse>}
     */
    photosGetChatUploadServer(params: MethodsProps.PhotosGetChatUploadServerParams): Promise<Responses.PhotosGetChatUploadServerResponse>;
    /**
     * Returns the server address for market photo upload.
     *
     * @param {{
     *   group_id: (number),
     *   main_photo: (boolean|undefined),
     *   crop_x: (number|undefined),
     *   crop_y: (number|undefined),
     *   crop_width: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetMarketUploadServerResponse>}
     */
    photosGetMarketUploadServer(params: MethodsProps.PhotosGetMarketUploadServerParams): Promise<Responses.PhotosGetMarketUploadServerResponse>;
    /**
     * Returns the server address for market album photo upload.
     *
     * @param {{
     *   group_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetMarketAlbumUploadServerResponse>}
     */
    photosGetMarketAlbumUploadServer(params: MethodsProps.PhotosGetMarketAlbumUploadServerParams): Promise<Responses.PhotosGetMarketAlbumUploadServerResponse>;
    /**
     * Saves market photos after successful uploading.
     *
     * @param {{
     *   group_id: (number|undefined),
     *   photo: (string),
     *   server: (number),
     *   hash: (string),
     *   crop_data: (string|undefined),
     *   crop_hash: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosSaveMarketPhotoResponse>}
     */
    photosSaveMarketPhoto(params: MethodsProps.PhotosSaveMarketPhotoParams): Promise<Responses.PhotosSaveMarketPhotoResponse>;
    /**
     * Saves cover photo after successful uploading.
     *
     * @param {{
     *   photo: (string),
     *   hash: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosSaveOwnerCoverPhotoResponse>}
     */
    photosSaveOwnerCoverPhoto(params: MethodsProps.PhotosSaveOwnerCoverPhotoParams): Promise<Responses.PhotosSaveOwnerCoverPhotoResponse>;
    /**
     * Saves market album photos after successful uploading.
     *
     * @param {{
     *   group_id: (number),
     *   photo: (string),
     *   server: (number),
     *   hash: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosSaveMarketAlbumPhotoResponse>}
     */
    photosSaveMarketAlbumPhoto(params: MethodsProps.PhotosSaveMarketAlbumPhotoParams): Promise<Responses.PhotosSaveMarketAlbumPhotoResponse>;
    /**
     * Saves a profile or community photo. Upload URL can be got with the [vk.com/dev/photos.getOwnerPhotoUploadServer|photos.getOwnerPhotoUploadServer] method.
     *
     * @param {{
     *   server: (string|undefined),
     *   hash: (string|undefined),
     *   photo: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosSaveOwnerPhotoResponse>}
     */
    photosSaveOwnerPhoto(params: MethodsProps.PhotosSaveOwnerPhotoParams): Promise<Responses.PhotosSaveOwnerPhotoResponse>;
    /**
     * Saves a photo to a user's or community's wall after being uploaded.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   group_id: (number|undefined),
     *   photo: (string),
     *   server: (number|undefined),
     *   hash: (string|undefined),
     *   latitude: (number|undefined),
     *   longitude: (number|undefined),
     *   caption: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosSaveWallPhotoResponse>}
     */
    photosSaveWallPhoto(params: MethodsProps.PhotosSaveWallPhotoParams): Promise<Responses.PhotosSaveWallPhotoResponse>;
    /**
     * Returns the server address for photo upload onto a user's wall.
     *
     * @param {{
     *   group_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetWallUploadServerResponse>}
     */
    photosGetWallUploadServer(params: MethodsProps.PhotosGetWallUploadServerParams): Promise<Responses.PhotosGetWallUploadServerResponse>;
    /**
     * Returns the server address for photo upload in a private message for a user.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetMessagesUploadServerResponse>}
     */
    photosGetMessagesUploadServer(params: MethodsProps.PhotosGetMessagesUploadServerParams): Promise<Responses.PhotosGetMessagesUploadServerResponse>;
    /**
     * Saves a photo after being successfully uploaded. URL obtained with [vk.com/dev/photos.getMessagesUploadServer|photos.getMessagesUploadServer] method.
     *
     * @param {{
     *   photo: (string),
     *   server: (number|undefined),
     *   hash: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosSaveMessagesPhotoResponse>}
     */
    photosSaveMessagesPhoto(params: MethodsProps.PhotosSaveMessagesPhotoParams): Promise<Responses.PhotosSaveMessagesPhotoResponse>;
    /**
     * Reports (submits a complaint about) a photo.
     *
     * @param {{
     *   owner_id: (number),
     *   photo_id: (number),
     *   reason: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosReport(params: MethodsProps.PhotosReportParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a comment on a photo.
     *
     * @param {{
     *   owner_id: (number),
     *   comment_id: (number),
     *   reason: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosReportComment(params: MethodsProps.PhotosReportCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of photos.
     *
     * @param {{
     *   q: (string|undefined),
     *   lat: (number|undefined),
     *   long: (number|undefined),
     *   start_time: (number|undefined),
     *   end_time: (number|undefined),
     *   sort: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   radius: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosSearchResponse>}
     */
    photosSearch(params: MethodsProps.PhotosSearchParams): Promise<Responses.PhotosSearchResponse>;
    /**
     * Returns a list of user IDs or detailed information about a user's friends.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   order: (string|undefined),
     *   list_id: (number|undefined),
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsGetResponse>}
     */
    friendsGet(params: MethodsProps.FriendsGetParams): Promise<Responses.FriendsGetResponse>;
    /**
     * Returns a list of user IDs of a user's friends who are online.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   list_id: (number|undefined),
     *   online_mobile: (boolean|undefined),
     *   order: (string|undefined),
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsGetOnlineResponse>}
     */
    friendsGetOnline(params: MethodsProps.FriendsGetOnlineParams): Promise<Responses.FriendsGetOnlineResponse>;
    /**
     * Returns a list of user IDs of the mutual friends of two users.
     *
     * @param {{
     *   source_uid: (number|undefined),
     *   target_uid: (number|undefined),
     *   target_uids: (number[]|undefined),
     *   order: (string|undefined),
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsGetMutualResponse>}
     */
    friendsGetMutual(params: MethodsProps.FriendsGetMutualParams): Promise<Responses.FriendsGetMutualResponse>;
    /**
     * Returns a list of user IDs of the current user's recently added friends.
     *
     * @param {{
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsGetRecentResponse>}
     */
    friendsGetRecent(params: MethodsProps.FriendsGetRecentParams): Promise<Responses.FriendsGetRecentResponse>;
    /**
     * Returns information about the current user's incoming and outgoing friend requests.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   need_mutual: (boolean|undefined),
     *   out: (boolean|undefined),
     *   sort: (number|undefined),
     *   suggested: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsGetRequestsResponse>}
     */
    friendsGetRequests(params: MethodsProps.FriendsGetRequestsParams): Promise<Responses.FriendsGetRequestsResponse>;
    /**
     * Approves or creates a friend request.
     *
     * @param {{
     *   user_id: (number),
     *   text: (string|undefined),
     *   follow: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsAddResponse>}
     */
    friendsAdd(params: MethodsProps.FriendsAddParams): Promise<Responses.FriendsAddResponse>;
    /**
     * Edits the friend lists of the selected user.
     *
     * @param {{
     *   user_id: (number),
     *   list_ids: (number[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    friendsEdit(params: MethodsProps.FriendsEditParams): Promise<Responses.OkResponse>;
    /**
     * Declines a friend request or deletes a user from the current user's friend list.
     *
     * @param {{
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsDeleteResponse>}
     */
    friendsDelete(params: MethodsProps.FriendsDeleteParams): Promise<Responses.FriendsDeleteResponse>;
    /**
     * Returns a list of the user's friend lists.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   return_system: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsGetListsResponse>}
     */
    friendsGetLists(params: MethodsProps.FriendsGetListsParams): Promise<Responses.FriendsGetListsResponse>;
    /**
     * Creates a new friend list for the current user.
     *
     * @param {{
     *   name: (string),
     *   user_ids: (number[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsAddListResponse>}
     */
    friendsAddList(params: MethodsProps.FriendsAddListParams): Promise<Responses.FriendsAddListResponse>;
    /**
     * Edits a friend list of the current user.
     *
     * @param {{
     *   name: (string|undefined),
     *   list_id: (number),
     *   user_ids: (number[]|undefined),
     *   add_user_ids: (number[]|undefined),
     *   delete_user_ids: (number[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    friendsEditList(params: MethodsProps.FriendsEditListParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a friend list of the current user.
     *
     * @param {{
     *   list_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    friendsDeleteList(params: MethodsProps.FriendsDeleteListParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of IDs of the current user's friends who installed the application.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsGetAppUsersResponse>}
     */
    friendsGetAppUsers(params: MethodsProps.FriendsGetAppUsersParams): Promise<Responses.FriendsGetAppUsersResponse>;
    /**
     * Returns a list of the current user's friends whose phone numbers, validated or specified in a profile, are in a given list.
     *
     * @param {{
     *   phones: (string[]|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsGetByPhonesResponse>}
     */
    friendsGetByPhones(params: MethodsProps.FriendsGetByPhonesParams): Promise<Responses.FriendsGetByPhonesResponse>;
    /**
     * Marks all incoming friend requests as viewed.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    friendsDeleteAllRequests(params: MethodsProps.FriendsDeleteAllRequestsParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of profiles of users whom the current user may know.
     *
     * @param {{
     *   filter: (string[]|undefined),
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsGetSuggestionsResponse>}
     */
    friendsGetSuggestions(params: MethodsProps.FriendsGetSuggestionsParams): Promise<Responses.FriendsGetSuggestionsResponse>;
    /**
     * Checks the current user's friendship status with other specified users.
     *
     * @param {{
     *   user_ids: (number[]),
     *   need_sign: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsAreFriendsResponse>}
     */
    friendsAreFriends(params: MethodsProps.FriendsAreFriendsParams): Promise<Responses.FriendsAreFriendsResponse>;
    /**
     * Returns a list of friends who can be called by the current user.
     *
     * @param {{
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsGetAvailableForCallResponse>}
     */
    friendsGetAvailableForCall(params: MethodsProps.FriendsGetAvailableForCallParams): Promise<Responses.FriendsGetAvailableForCallResponse>;
    /**
     * Returns a list of friends matching the search criteria.
     *
     * @param {{
     *   user_id: (number),
     *   q: (string|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FriendsSearchResponse>}
     */
    friendsSearch(params: MethodsProps.FriendsSearchParams): Promise<Responses.FriendsSearchResponse>;
    /**
     * Gets a list of comments for the page added through the [vk.com/dev/Comments|Comments widget].
     *
     * @param {{
     *   widget_api_id: (number|undefined),
     *   url: (string|undefined),
     *   page_id: (string|undefined),
     *   order: (string|undefined),
     *   fields: (string[]|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.WidgetsGetCommentsResponse>}
     */
    widgetsGetComments(params: MethodsProps.WidgetsGetCommentsParams): Promise<Responses.WidgetsGetCommentsResponse>;
    /**
     * Gets a list of application/site pages where the [vk.com/dev/Comments|Comments widget] or [vk.com/dev/Like|Like widget] is installed.
     *
     * @param {{
     *   widget_api_id: (number|undefined),
     *   order: (string|undefined),
     *   period: (string|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.WidgetsGetPagesResponse>}
     */
    widgetsGetPages(params: MethodsProps.WidgetsGetPagesParams): Promise<Responses.WidgetsGetPagesResponse>;
    /**
     * Allows to hide stories from chosen sources from current user's feed.
     *
     * @param {{
     *   owners_ids: (number[]),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    storiesBanOwner(params: MethodsProps.StoriesBanOwnerParams): Promise<Responses.OkResponse>;
    /**
     * Allows to delete story.
     *
     * @param {{
     *   owner_id: (number),
     *   story_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    storiesDelete(params: MethodsProps.StoriesDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Returns stories available for current user.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StoriesGetResponse>}
     */
    storiesGet(params: MethodsProps.StoriesGetParams): Promise<Responses.StoriesGetResponse>;
    /**
     * Returns list of sources hidden from current user's feed.
     *
     * @param {{
     *   fields: (string[]|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StoriesGetBannedResponse>}
     */
    storiesGetBanned(params: MethodsProps.StoriesGetBannedParams): Promise<Responses.StoriesGetBannedResponse>;
    /**
     * Returns story by its ID.
     *
     * @param {{
     *   stories: (string[]|undefined),
     *   extended: (boolean|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StoriesGetByIdResponse>}
     */
    storiesGetById(params: MethodsProps.StoriesGetByIdParams): Promise<Responses.StoriesGetByIdResponse>;
    /**
     * Returns URL for uploading a story with photo.
     *
     * @param {{
     *   add_to_news: (boolean|undefined),
     *   user_ids: (number[]|undefined),
     *   reply_to_story: (string|undefined),
     *   link_text: (string|undefined),
     *   link_url: (string|undefined),
     *   group_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StoriesGetPhotoUploadServerResponse>}
     */
    storiesGetPhotoUploadServer(params: MethodsProps.StoriesGetPhotoUploadServerParams): Promise<Responses.StoriesGetPhotoUploadServerResponse>;
    /**
     * Returns replies to the story.
     *
     * @param {{
     *   owner_id: (number),
     *   story_id: (number),
     *   access_key: (string|undefined),
     *   extended: (boolean|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StoriesGetRepliesResponse>}
     */
    storiesGetReplies(params: MethodsProps.StoriesGetRepliesParams): Promise<Responses.StoriesGetRepliesResponse>;
    /**
     * Returns stories available for current user.
     *
     * @param {{
     *   owner_id: (number),
     *   story_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StoriesGetStatsResponse>}
     */
    storiesGetStats(params: MethodsProps.StoriesGetStatsParams): Promise<Responses.StoriesGetStatsResponse>;
    /**
     * Allows to receive URL for uploading story with video.
     *
     * @param {{
     *   add_to_news: (boolean|undefined),
     *   user_ids: (number[]|undefined),
     *   reply_to_story: (string|undefined),
     *   link_text: (string|undefined),
     *   link_url: (string|undefined),
     *   group_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StoriesGetVideoUploadServerResponse>}
     */
    storiesGetVideoUploadServer(params: MethodsProps.StoriesGetVideoUploadServerParams): Promise<Responses.StoriesGetVideoUploadServerResponse>;
    /**
     * Returns a list of story viewers.
     *
     * @param {{
     *   owner_id: (number),
     *   story_id: (number),
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StoriesGetViewersResponse>}
     */
    storiesGetViewers(params: MethodsProps.StoriesGetViewersParams): Promise<Responses.StoriesGetViewersResponse>;
    /**
     * Hides all replies in the last 24 hours from the user to current user's stories.
     *
     * @param {{
     *   owner_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    storiesHideAllReplies(params: MethodsProps.StoriesHideAllRepliesParams): Promise<Responses.OkResponse>;
    /**
     * Hides the reply to the current user's story.
     *
     * @param {{
     *   owner_id: (number),
     *   story_id: (number),
     *   access_key: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    storiesHideReply(params: MethodsProps.StoriesHideReplyParams): Promise<Responses.OkResponse>;
    /**
     * Allows to show stories from hidden sources in current user's feed.
     *
     * @param {{
     *   owners_ids: (number[]),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    storiesUnbanOwner(params: MethodsProps.StoriesUnbanOwnerParams): Promise<Responses.OkResponse>;
    /**
     * Returns payment balance of the application in hundredth of a vote.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.SecureGetAppBalanceResponse>}
     */
    secureGetAppBalance(params: MethodsProps.SecureGetAppBalanceParams): Promise<Responses.SecureGetAppBalanceResponse>;
    /**
     * Shows history of votes transaction between users and the application.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.SecureGetTransactionsHistoryResponse>}
     */
    secureGetTransactionsHistory(params: MethodsProps.SecureGetTransactionsHistoryParams): Promise<Responses.SecureGetTransactionsHistoryResponse>;
    /**
     * Shows a list of SMS notifications sent by the application using [vk.com/dev/secure.sendSMSNotification|secure.sendSMSNotification] method.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   date_from: (number|undefined),
     *   date_to: (number|undefined),
     *   limit: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.SecureGetSMSHistoryResponse>}
     */
    secureGetSMSHistory(params: MethodsProps.SecureGetSMSHistoryParams): Promise<Responses.SecureGetSMSHistoryResponse>;
    /**
     * Sends 'SMS' notification to a user's mobile device.
     *
     * @param {{
     *   user_id: (number),
     *   message: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    secureSendSMSNotification(params: MethodsProps.SecureSendSMSNotificationParams): Promise<Responses.OkResponse>;
    /**
     * Sends notification to the user.
     *
     * @param {{
     *   user_ids: (number[]|undefined),
     *   user_id: (number|undefined),
     *   message: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.SecureSendNotificationResponse>}
     */
    secureSendNotification(params: MethodsProps.SecureSendNotificationParams): Promise<Responses.SecureSendNotificationResponse>;
    /**
     * Sets a counter which is shown to the user in bold in the left menu.
     *
     * @param {{
     *   counters: (string[]|undefined),
     *   user_id: (number|undefined),
     *   counter: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    secureSetCounter(params: MethodsProps.SecureSetCounterParams): Promise<Responses.OkResponse>;
    /**
     * Sets user game level in the application which can be seen by his/her friends.
     *
     * @param {{
     *   levels: (string[]|undefined),
     *   user_id: (number|undefined),
     *   level: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    secureSetUserLevel(params: MethodsProps.SecureSetUserLevelParams): Promise<Responses.OkResponse>;
    /**
     * Returns one of the previously set game levels of one or more users in the application.
     *
     * @param {{
     *   user_ids: (number[]),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.SecureGetUserLevelResponse>}
     */
    secureGetUserLevel(params: MethodsProps.SecureGetUserLevelParams): Promise<Responses.SecureGetUserLevelResponse>;
    /**
     * Allows to receive data for the connection to Streaming API.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StreamingGetServerUrlResponse>}
     */
    streamingGetServerUrl(params: MethodsProps.StreamingGetServerUrlParams): Promise<Responses.StreamingGetServerUrlResponse>;
    /**
     * Returns a value of variable with the name set by key parameter.
     *
     * @param {{
     *   key: (string|undefined),
     *   keys: (string[]|undefined),
     *   user_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StorageGetResponse>}
     */
    storageGet(params: MethodsProps.StorageGetParams): Promise<Responses.StorageGetResponse>;
    /**
     * Saves a value of variable with the name set by 'key' parameter.
     *
     * @param {{
     *   key: (string),
     *   value: (string|undefined),
     *   user_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    storageSet(params: MethodsProps.StorageSetParams): Promise<Responses.OkResponse>;
    /**
     * Returns the names of all variables.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StorageGetKeysResponse>}
     */
    storageGetKeys(params: MethodsProps.StorageGetKeysParams): Promise<Responses.StorageGetKeysResponse>;
    /**
     * Returns a list of orders.
     *
     * @param {{
     *   count: (number|undefined),
     *   test_mode: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OrdersGetResponse>}
     */
    ordersGet(params: MethodsProps.OrdersGetParams): Promise<Responses.OrdersGetResponse>;
    /**
     * Returns information about orders by their IDs.
     *
     * @param {{
     *   order_id: (number|undefined),
     *   order_ids: (number[]|undefined),
     *   test_mode: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OrdersGetByIdResponse>}
     */
    ordersGetById(params: MethodsProps.OrdersGetByIdParams): Promise<Responses.OrdersGetByIdResponse>;
    /**
     * Changes order status.
     *
     * @param {{
     *   order_id: (number),
     *   action: (string),
     *   app_order_id: (number|undefined),
     *   test_mode: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OrdersChangeStateResponse>}
     */
    ordersChangeState(params: MethodsProps.OrdersChangeStateParams): Promise<Responses.OrdersChangeStateResponse>;
    /**
     * undefined
     *
     * @param {{
     *   user_id: (number),
     *   votes: (string[]),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OrdersGetAmountResponse>}
     */
    ordersGetAmount(params: MethodsProps.OrdersGetAmountParams): Promise<Responses.OrdersGetAmountResponse>;
    /**
     * Saves photos after successful uploading.
     *
     * @param {{
     *   album_id: (number|undefined),
     *   group_id: (number|undefined),
     *   server: (number|undefined),
     *   photos_list: (string|undefined),
     *   hash: (string|undefined),
     *   latitude: (number|undefined),
     *   longitude: (number|undefined),
     *   caption: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosSaveResponse>}
     */
    photosSave(params: MethodsProps.PhotosSaveParams): Promise<Responses.PhotosSaveResponse>;
    /**
     * Allows to copy a photo to the "Saved photos" album
     *
     * @param {{
     *   owner_id: (number),
     *   photo_id: (number),
     *   access_key: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosCopyResponse>}
     */
    photosCopy(params: MethodsProps.PhotosCopyParams): Promise<Responses.PhotosCopyResponse>;
    /**
     * Edits the caption of a photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   photo_id: (number),
     *   caption: (string|undefined),
     *   latitude: (number|undefined),
     *   longitude: (number|undefined),
     *   place_str: (string|undefined),
     *   foursquare_id: (string|undefined),
     *   delete_place: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosEdit(params: MethodsProps.PhotosEditParams): Promise<Responses.OkResponse>;
    /**
     * Moves a photo from one album to another.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   target_album_id: (number),
     *   photo_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosMove(params: MethodsProps.PhotosMoveParams): Promise<Responses.OkResponse>;
    /**
     * Makes a photo into an album cover.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   photo_id: (number),
     *   album_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosMakeCover(params: MethodsProps.PhotosMakeCoverParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the album in the list of user albums.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   album_id: (number),
     *   before: (number|undefined),
     *   after: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosReorderAlbums(params: MethodsProps.PhotosReorderAlbumsParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the photo in the list of photos of the user album.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   photo_id: (number),
     *   before: (number|undefined),
     *   after: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosReorderPhotos(params: MethodsProps.PhotosReorderPhotosParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of photos belonging to a user or community, in reverse chronological order.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   extended: (boolean|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   photo_sizes: (boolean|undefined),
     *   no_service_albums: (boolean|undefined),
     *   need_hidden: (boolean|undefined),
     *   skip_hidden: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetAllResponse>}
     */
    photosGetAll(params: MethodsProps.PhotosGetAllParams): Promise<Responses.PhotosGetAllResponse>;
    /**
     * Returns a list of photos in which a user is tagged.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   sort: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetUserPhotosResponse>}
     */
    photosGetUserPhotos(params: MethodsProps.PhotosGetUserPhotosParams): Promise<Responses.PhotosGetUserPhotosResponse>;
    /**
     * Deletes a photo album belonging to the current user.
     *
     * @param {{
     *   album_id: (number),
     *   group_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosDeleteAlbum(params: MethodsProps.PhotosDeleteAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   photo_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosDelete(params: MethodsProps.PhotosDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Restores a deleted photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   photo_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosRestore(params: MethodsProps.PhotosRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Confirms a tag on a photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   photo_id: (string),
     *   tag_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosConfirmTag(params: MethodsProps.PhotosConfirmTagParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of comments on a photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   photo_id: (number),
     *   need_likes: (boolean|undefined),
     *   start_comment_id: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   sort: (string|undefined),
     *   access_key: (string|undefined),
     *   extended: (boolean|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetCommentsResponse>}
     */
    photosGetComments(params: MethodsProps.PhotosGetCommentsParams): Promise<Responses.PhotosGetCommentsResponse>;
    /**
     * Returns a list of comments on a specific photo album or all albums of the user sorted in reverse chronological order.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   album_id: (number|undefined),
     *   need_likes: (boolean|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetAllCommentsResponse>}
     */
    photosGetAllComments(params: MethodsProps.PhotosGetAllCommentsParams): Promise<Responses.PhotosGetAllCommentsResponse>;
    /**
     * Adds a new comment on the photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   photo_id: (number),
     *   message: (string|undefined),
     *   attachments: (string[]|undefined),
     *   from_group: (boolean|undefined),
     *   reply_to_comment: (number|undefined),
     *   sticker_id: (number|undefined),
     *   access_key: (string|undefined),
     *   guid: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosCreateCommentResponse>}
     */
    photosCreateComment(params: MethodsProps.PhotosCreateCommentParams): Promise<Responses.PhotosCreateCommentResponse>;
    /**
     * Deletes a comment on the photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   comment_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosDeleteCommentResponse>}
     */
    photosDeleteComment(params: MethodsProps.PhotosDeleteCommentParams): Promise<Responses.PhotosDeleteCommentResponse>;
    /**
     * Restores a deleted comment on a photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   comment_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosRestoreCommentResponse>}
     */
    photosRestoreComment(params: MethodsProps.PhotosRestoreCommentParams): Promise<Responses.PhotosRestoreCommentResponse>;
    /**
     * Edits a comment on a photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   comment_id: (number),
     *   message: (string|undefined),
     *   attachments: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosEditComment(params: MethodsProps.PhotosEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of tags on a photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   photo_id: (number),
     *   access_key: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetTagsResponse>}
     */
    photosGetTags(params: MethodsProps.PhotosGetTagsParams): Promise<Responses.PhotosGetTagsResponse>;
    /**
     * Adds a tag on the photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   photo_id: (number),
     *   user_id: (number),
     *   x: (number|undefined),
     *   y: (number|undefined),
     *   x2: (number|undefined),
     *   y2: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosPutTagResponse>}
     */
    photosPutTag(params: MethodsProps.PhotosPutTagParams): Promise<Responses.PhotosPutTagResponse>;
    /**
     * Removes a tag from a photo.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   photo_id: (number),
     *   tag_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    photosRemoveTag(params: MethodsProps.PhotosRemoveTagParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of photos with tags that have not been viewed.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PhotosGetNewTagsResponse>}
     */
    photosGetNewTags(params: MethodsProps.PhotosGetNewTagsParams): Promise<Responses.PhotosGetNewTagsResponse>;
    /**
     * Returns a list of posts from user or community walls by their IDs.
     *
     * @param {{
     *   posts: (string[]),
     *   extended: (boolean|undefined),
     *   copy_history_depth: (number|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.WallGetByIdResponse>}
     */
    wallGetById(params: MethodsProps.WallGetByIdParams): Promise<Responses.WallGetByIdResponse>;
    /**
     * Adds a new post on a user wall or community wall. Can also be used to publish suggested or scheduled posts.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   friends_only: (boolean|undefined),
     *   from_group: (boolean|undefined),
     *   message: (string|undefined),
     *   attachments: (string[]|undefined),
     *   services: (string|undefined),
     *   signed: (boolean|undefined),
     *   publish_date: (number|undefined),
     *   lat: (number|undefined),
     *   long: (number|undefined),
     *   place_id: (number|undefined),
     *   post_id: (number|undefined),
     *   guid: (string|undefined),
     *   mark_as_ads: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.WallPostResponse>}
     */
    wallPost(params: MethodsProps.WallPostParams): Promise<Responses.WallPostResponse>;
    /**
     * Reposts (copies) an object to a user wall or community wall.
     *
     * @param {{
     *   object: (string),
     *   message: (string|undefined),
     *   group_id: (number|undefined),
     *   mark_as_ads: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.WallRepostResponse>}
     */
    wallRepost(params: MethodsProps.WallRepostParams): Promise<Responses.WallRepostResponse>;
    /**
     * Returns information about reposts of a post on user wall or community wall.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   post_id: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.WallGetRepostsResponse>}
     */
    wallGetReposts(params: MethodsProps.WallGetRepostsParams): Promise<Responses.WallGetRepostsResponse>;
    /**
     * Edits a post on a user wall or community wall.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   post_id: (number),
     *   friends_only: (boolean|undefined),
     *   message: (string|undefined),
     *   attachments: (string[]|undefined),
     *   services: (string|undefined),
     *   signed: (boolean|undefined),
     *   publish_date: (number|undefined),
     *   lat: (number|undefined),
     *   long: (number|undefined),
     *   place_id: (number|undefined),
     *   mark_as_ads: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    wallEdit(params: MethodsProps.WallEditParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a post from a user wall or community wall.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   post_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    wallDelete(params: MethodsProps.WallDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Restores a post deleted from a user wall or community wall.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   post_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    wallRestore(params: MethodsProps.WallRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Pins the post on wall.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   post_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    wallPin(params: MethodsProps.WallPinParams): Promise<Responses.OkResponse>;
    /**
     * Unpins the post on wall.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   post_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    wallUnpin(params: MethodsProps.WallUnpinParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of comments on a post on a user wall or community wall.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   post_id: (number),
     *   need_likes: (boolean|undefined),
     *   start_comment_id: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   sort: (string|undefined),
     *   preview_length: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.WallGetCommentsResponse>}
     */
    wallGetComments(params: MethodsProps.WallGetCommentsParams): Promise<Responses.WallGetCommentsResponse>;
    /**
     * Adds a comment to a post on a user wall or community wall.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   post_id: (number),
     *   from_group: (number|undefined),
     *   message: (string|undefined),
     *   reply_to_comment: (number|undefined),
     *   attachments: (string[]|undefined),
     *   sticker_id: (number|undefined),
     *   guid: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.WallCreateCommentResponse>}
     */
    wallCreateComment(params: MethodsProps.WallCreateCommentParams): Promise<Responses.WallCreateCommentResponse>;
    /**
     * Edits a comment on a user wall or community wall.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   comment_id: (number),
     *   message: (string|undefined),
     *   attachments: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    wallEditComment(params: MethodsProps.WallEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a comment on a post on a user wall or community wall.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   comment_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    wallDeleteComment(params: MethodsProps.WallDeleteCommentParams): Promise<Responses.OkResponse>;
    /**
     * Restores a comment deleted from a user wall or community wall.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   comment_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    wallRestoreComment(params: MethodsProps.WallRestoreCommentParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a post on a user wall or community wall.
     *
     * @param {{
     *   owner_id: (number),
     *   post_id: (number),
     *   reason: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    wallReportPost(params: MethodsProps.WallReportPostParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a comment on a post on a user wall or community wall.
     *
     * @param {{
     *   owner_id: (number),
     *   comment_id: (number),
     *   reason: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    wallReportComment(params: MethodsProps.WallReportCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns data required to show the status of a user or community.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   group_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StatusGetResponse>}
     */
    statusGet(params: MethodsProps.StatusGetParams): Promise<Responses.StatusGetResponse>;
    /**
     * Sets a new status for the current user.
     *
     * @param {{
     *   text: (string|undefined),
     *   group_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    statusSet(params: MethodsProps.StatusSetParams): Promise<Responses.OkResponse>;
    /**
     * Completes the lead started by user.
     *
     * @param {{
     *   vk_sid: (string),
     *   secret: (string),
     *   comment: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.LeadsCompleteResponse>}
     */
    leadsComplete(params: MethodsProps.LeadsCompleteParams): Promise<Responses.LeadsCompleteResponse>;
    /**
     * Creates new session for the user passing the offer.
     *
     * @param {{
     *   lead_id: (number),
     *   secret: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.LeadsStartResponse>}
     */
    leadsStart(params: MethodsProps.LeadsStartParams): Promise<Responses.LeadsStartResponse>;
    /**
     * Returns lead stats data.
     *
     * @param {{
     *   lead_id: (number),
     *   secret: (string|undefined),
     *   date_start: (string|undefined),
     *   date_end: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.LeadsGetStatsResponse>}
     */
    leadsGetStats(params: MethodsProps.LeadsGetStatsParams): Promise<Responses.LeadsGetStatsResponse>;
    /**
     * Returns a list of last user actions for the offer.
     *
     * @param {{
     *   offer_id: (number),
     *   secret: (string),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   status: (number|undefined),
     *   reverse: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.LeadsGetUsersResponse>}
     */
    leadsGetUsers(params: MethodsProps.LeadsGetUsersParams): Promise<Responses.LeadsGetUsersResponse>;
    /**
     * Checks if the user can start the lead.
     *
     * @param {{
     *   lead_id: (number),
     *   test_result: (number|undefined),
     *   age: (number|undefined),
     *   country: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.LeadsCheckUserResponse>}
     */
    leadsCheckUser(params: MethodsProps.LeadsCheckUserParams): Promise<Responses.LeadsCheckUserResponse>;
    /**
     * Counts the metric event.
     *
     * @param {{
     *   data: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.LeadsMetricHitResponse>}
     */
    leadsMetricHit(params: MethodsProps.LeadsMetricHitParams): Promise<Responses.LeadsMetricHitResponse>;
    /**
     * Returns information about a wiki page.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   page_id: (number|undefined),
     *   global: (boolean|undefined),
     *   site_preview: (boolean|undefined),
     *   title: (string|undefined),
     *   need_source: (boolean|undefined),
     *   need_html: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PagesGetResponse>}
     */
    pagesGet(params: MethodsProps.PagesGetParams): Promise<Responses.PagesGetResponse>;
    /**
     * Saves the text of a wiki page.
     *
     * @param {{
     *   text: (string|undefined),
     *   page_id: (number|undefined),
     *   group_id: (number|undefined),
     *   user_id: (number|undefined),
     *   title: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PagesSaveResponse>}
     */
    pagesSave(params: MethodsProps.PagesSaveParams): Promise<Responses.PagesSaveResponse>;
    /**
     * Saves modified read and edit access settings for a wiki page.
     *
     * @param {{
     *   page_id: (number),
     *   group_id: (number|undefined),
     *   user_id: (number|undefined),
     *   view: (number|undefined),
     *   edit: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PagesSaveAccessResponse>}
     */
    pagesSaveAccess(params: MethodsProps.PagesSaveAccessParams): Promise<Responses.PagesSaveAccessResponse>;
    /**
     * Returns a list of all previous versions of a wiki page.
     *
     * @param {{
     *   page_id: (number),
     *   group_id: (number|undefined),
     *   user_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PagesGetHistoryResponse>}
     */
    pagesGetHistory(params: MethodsProps.PagesGetHistoryParams): Promise<Responses.PagesGetHistoryResponse>;
    /**
     * Returns a list of wiki pages in a group.
     *
     * @param {{
     *   group_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PagesGetTitlesResponse>}
     */
    pagesGetTitles(params: MethodsProps.PagesGetTitlesParams): Promise<Responses.PagesGetTitlesResponse>;
    /**
     * Returns the text of one of the previous versions of a wiki page.
     *
     * @param {{
     *   version_id: (number),
     *   group_id: (number|undefined),
     *   user_id: (number|undefined),
     *   need_html: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PagesGetVersionResponse>}
     */
    pagesGetVersion(params: MethodsProps.PagesGetVersionParams): Promise<Responses.PagesGetVersionResponse>;
    /**
     * Returns HTML representation of the wiki markup.
     *
     * @param {{
     *   text: (string),
     *   group_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PagesParseWikiResponse>}
     */
    pagesParseWiki(params: MethodsProps.PagesParseWikiParams): Promise<Responses.PagesParseWikiResponse>;
    /**
     * Allows to clear the cache of particular 'external' pages which may be attached to VK posts.
     *
     * @param {{
     *   url: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    pagesClearCache(params: MethodsProps.PagesClearCacheParams): Promise<Responses.OkResponse>;
    /**
     * Returns information specifying whether a user is a member of a community.
     *
     * @param {{
     *   group_id: (string),
     *   user_id: (number|undefined),
     *   user_ids: (number[]|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsIsMemberResponse>}
     */
    groupsIsMember(params: MethodsProps.GroupsIsMemberParams): Promise<Responses.GroupsIsMemberResponse>;
    /**
     * Returns information about communities by their IDs.
     *
     * @param {{
     *   group_ids: (string[]|undefined),
     *   group_id: (string|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetByIdResponse>}
     */
    groupsGetById(params: MethodsProps.GroupsGetByIdParams): Promise<Responses.GroupsGetByIdResponse>;
    /**
     * Returns a list of the communities to which a user belongs.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   extended: (boolean|undefined),
     *   filter: (string[]|undefined),
     *   fields: (string[]|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetResponse>}
     */
    groupsGet(params: MethodsProps.GroupsGetParams): Promise<Responses.GroupsGetResponse>;
    /**
     * Returns a list of community members.
     *
     * @param {{
     *   group_id: (string|undefined),
     *   sort: (string|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   fields: (string[]|undefined),
     *   filter: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetMembersResponse>}
     */
    groupsGetMembers(params: MethodsProps.GroupsGetMembersParams): Promise<Responses.GroupsGetMembersResponse>;
    /**
     * With this method you can join the group or public page, and also confirm your participation in an event.
     *
     * @param {{
     *   group_id: (number|undefined),
     *   not_sure: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsJoin(params: MethodsProps.GroupsJoinParams): Promise<Responses.OkResponse>;
    /**
     * With this method you can leave a group, public page, or event.
     *
     * @param {{
     *   group_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsLeave(params: MethodsProps.GroupsLeaveParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of communities matching the search criteria.
     *
     * @param {{
     *   q: (string),
     *   type: (string|undefined),
     *   country_id: (number|undefined),
     *   city_id: (number|undefined),
     *   future: (boolean|undefined),
     *   market: (boolean|undefined),
     *   sort: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsSearchResponse>}
     */
    groupsSearch(params: MethodsProps.GroupsSearchParams): Promise<Responses.GroupsSearchResponse>;
    /**
     * Returns communities list for a catalog category.
     *
     * @param {{
     *   category_id: (number|undefined),
     *   subcategory_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetCatalogResponse>}
     */
    groupsGetCatalog(params: MethodsProps.GroupsGetCatalogParams): Promise<Responses.GroupsGetCatalogResponse>;
    /**
     * Returns categories list for communities catalog
     *
     * @param {{
     *   extended: (boolean|undefined),
     *   subcategories: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetCatalogInfoResponse>}
     */
    groupsGetCatalogInfo(params: MethodsProps.GroupsGetCatalogInfoParams): Promise<Responses.GroupsGetCatalogInfoResponse>;
    /**
     * Returns a list of invitations to join communities and events.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetInvitesResponse>}
     */
    groupsGetInvites(params: MethodsProps.GroupsGetInvitesParams): Promise<Responses.GroupsGetInvitesResponse>;
    /**
     * Returns invited users list of a community
     *
     * @param {{
     *   group_id: (number),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetInvitedUsersResponse>}
     */
    groupsGetInvitedUsers(params: MethodsProps.GroupsGetInvitedUsersParams): Promise<Responses.GroupsGetInvitedUsersResponse>;
    /**
     * Adds a user to a community blacklist.
     *
     * @param {{
     *   group_id: (number),
     *   user_id: (number),
     *   end_date: (number|undefined),
     *   reason: (number|undefined),
     *   comment: (string|undefined),
     *   comment_visible: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsBanUser(params: MethodsProps.GroupsBanUserParams): Promise<Responses.OkResponse>;
    /**
     * Removes a user from a community blacklist.
     *
     * @param {{
     *   group_id: (number),
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsUnbanUser(params: MethodsProps.GroupsUnbanUserParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of users on a community blacklist.
     *
     * @param {{
     *   group_id: (number),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   fields: (string[]|undefined),
     *   user_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetBannedResponse>}
     */
    groupsGetBanned(params: MethodsProps.GroupsGetBannedParams): Promise<Responses.GroupsGetBannedResponse>;
    /**
     * Creates a new community.
     *
     * @param {{
     *   title: (string),
     *   description: (string|undefined),
     *   type: (string|undefined),
     *   public_category: (number|undefined),
     *   subtype: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsCreateResponse>}
     */
    groupsCreate(params: MethodsProps.GroupsCreateParams): Promise<Responses.GroupsCreateResponse>;
    /**
     * Edits a community.
     *
     * @param {{
     *   group_id: (number),
     *   title: (string|undefined),
     *   description: (string|undefined),
     *   screen_name: (string|undefined),
     *   access: (number|undefined),
     *   website: (string|undefined),
     *   subject: (string|undefined),
     *   email: (string|undefined),
     *   phone: (string|undefined),
     *   rss: (string|undefined),
     *   event_start_date: (number|undefined),
     *   event_finish_date: (number|undefined),
     *   event_group_id: (number|undefined),
     *   public_category: (number|undefined),
     *   public_subcategory: (number|undefined),
     *   public_date: (string|undefined),
     *   wall: (number|undefined),
     *   topics: (number|undefined),
     *   photos: (number|undefined),
     *   video: (number|undefined),
     *   audio: (number|undefined),
     *   links: (boolean|undefined),
     *   events: (boolean|undefined),
     *   places: (boolean|undefined),
     *   contacts: (boolean|undefined),
     *   docs: (number|undefined),
     *   wiki: (number|undefined),
     *   messages: (boolean|undefined),
     *   age_limits: (number|undefined),
     *   market: (boolean|undefined),
     *   market_comments: (boolean|undefined),
     *   market_country: (number[]|undefined),
     *   market_city: (number[]|undefined),
     *   market_currency: (number|undefined),
     *   market_contact: (number|undefined),
     *   market_wiki: (number|undefined),
     *   obscene_filter: (boolean|undefined),
     *   obscene_stopwords: (boolean|undefined),
     *   obscene_words: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsEdit(params: MethodsProps.GroupsEditParams): Promise<Responses.OkResponse>;
    /**
     * Edits the place in community.
     *
     * @param {{
     *   group_id: (number),
     *   title: (string|undefined),
     *   address: (string|undefined),
     *   country_id: (number|undefined),
     *   city_id: (number|undefined),
     *   latitude: (number|undefined),
     *   longitude: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsEditPlaceResponse>}
     */
    groupsEditPlace(params: MethodsProps.GroupsEditPlaceParams): Promise<Responses.GroupsEditPlaceResponse>;
    /**
     * Returns community settings.
     *
     * @param {{
     *   group_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetSettingsResponse>}
     */
    groupsGetSettings(params: MethodsProps.GroupsGetSettingsParams): Promise<Responses.GroupsGetSettingsResponse>;
    /**
     * Returns a list of requests to the community.
     *
     * @param {{
     *   group_id: (number),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetRequestsResponse>}
     */
    groupsGetRequests(params: MethodsProps.GroupsGetRequestsParams): Promise<Responses.GroupsGetRequestsResponse>;
    /**
     * Allows to add, remove or edit the community manager.
     *
     * @param {{
     *   group_id: (number),
     *   user_id: (number),
     *   role: (string|undefined),
     *   is_contact: (boolean|undefined),
     *   contact_position: (string|undefined),
     *   contact_phone: (string|undefined),
     *   contact_email: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsEditManager(params: MethodsProps.GroupsEditManagerParams): Promise<Responses.OkResponse>;
    /**
     * Allows to invite friends to the community.
     *
     * @param {{
     *   group_id: (number),
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsInvite(params: MethodsProps.GroupsInviteParams): Promise<Responses.OkResponse>;
    /**
     * Allows to add a link to the community.
     *
     * @param {{
     *   group_id: (number),
     *   link: (string),
     *   text: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsAddLink(params: MethodsProps.GroupsAddLinkParams): Promise<Responses.OkResponse>;
    /**
     * Allows to delete a link from the community.
     *
     * @param {{
     *   group_id: (number),
     *   link_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsDeleteLink(params: MethodsProps.GroupsDeleteLinkParams): Promise<Responses.OkResponse>;
    /**
     * Allows to edit a link in the community.
     *
     * @param {{
     *   group_id: (number),
     *   link_id: (number),
     *   text: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsEditLink(params: MethodsProps.GroupsEditLinkParams): Promise<Responses.OkResponse>;
    /**
     * Allows to reorder links in the community.
     *
     * @param {{
     *   group_id: (number),
     *   link_id: (number),
     *   after: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsReorderLink(params: MethodsProps.GroupsReorderLinkParams): Promise<Responses.OkResponse>;
    /**
     * Removes a user from the community.
     *
     * @param {{
     *   group_id: (number),
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsRemoveUser(params: MethodsProps.GroupsRemoveUserParams): Promise<Responses.OkResponse>;
    /**
     * Allows to approve join request to the community.
     *
     * @param {{
     *   group_id: (number),
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsApproveRequest(params: MethodsProps.GroupsApproveRequestParams): Promise<Responses.OkResponse>;
    /**
     * Returns Callback API confirmation code for the community.
     *
     * @param {{
     *   group_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetCallbackConfirmationCodeResponse>}
     */
    groupsGetCallbackConfirmationCode(params: MethodsProps.GroupsGetCallbackConfirmationCodeParams): Promise<Responses.GroupsGetCallbackConfirmationCodeResponse>;
    /**
     * Returns [vk.com/dev/callback_api|Callback API] notifications settings.
     *
     * @param {{
     *   group_id: (number),
     *   server_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetCallbackSettingsResponse>}
     */
    groupsGetCallbackSettings(params: MethodsProps.GroupsGetCallbackSettingsParams): Promise<Responses.GroupsGetCallbackSettingsResponse>;
    /**
     * Allow to set notifications settings for group.
     *
     * @param {{
     *   group_id: (number),
     *   server_id: (number|undefined),
     *   message_new: (boolean|undefined),
     *   message_reply: (boolean|undefined),
     *   message_allow: (boolean|undefined),
     *   message_deny: (boolean|undefined),
     *   photo_new: (boolean|undefined),
     *   audio_new: (boolean|undefined),
     *   video_new: (boolean|undefined),
     *   wall_reply_new: (boolean|undefined),
     *   wall_reply_edit: (boolean|undefined),
     *   wall_reply_delete: (boolean|undefined),
     *   wall_reply_restore: (boolean|undefined),
     *   wall_post_new: (boolean|undefined),
     *   wall_repost: (boolean|undefined),
     *   board_post_new: (boolean|undefined),
     *   board_post_edit: (boolean|undefined),
     *   board_post_restore: (boolean|undefined),
     *   board_post_delete: (boolean|undefined),
     *   photo_comment_new: (boolean|undefined),
     *   photo_comment_edit: (boolean|undefined),
     *   photo_comment_delete: (boolean|undefined),
     *   photo_comment_restore: (boolean|undefined),
     *   video_comment_new: (boolean|undefined),
     *   video_comment_edit: (boolean|undefined),
     *   video_comment_delete: (boolean|undefined),
     *   video_comment_restore: (boolean|undefined),
     *   market_comment_new: (boolean|undefined),
     *   market_comment_edit: (boolean|undefined),
     *   market_comment_delete: (boolean|undefined),
     *   market_comment_restore: (boolean|undefined),
     *   poll_vote_new: (boolean|undefined),
     *   group_join: (boolean|undefined),
     *   group_leave: (boolean|undefined),
     *   user_block: (boolean|undefined),
     *   user_unblock: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsSetCallbackSettings(params: MethodsProps.GroupsSetCallbackSettingsParams): Promise<Responses.OkResponse>;
    /**
     * Returns the data needed to query a Long Poll server for events
     *
     * @param {{
     *   group_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetLongPollServerResponse>}
     */
    groupsGetLongPollServer(params: MethodsProps.GroupsGetLongPollServerParams): Promise<Responses.GroupsGetLongPollServerResponse>;
    /**
     * Returns Long Poll notification settings
     *
     * @param {{
     *   group_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GroupsGetLongPollSettingsResponse>}
     */
    groupsGetLongPollSettings(params: MethodsProps.GroupsGetLongPollSettingsParams): Promise<Responses.GroupsGetLongPollSettingsResponse>;
    /**
     * Sets Long Poll notification settings
     *
     * @param {{
     *   group_id: (number),
     *   enabled: (boolean|undefined),
     *   message_new: (boolean|undefined),
     *   message_reply: (boolean|undefined),
     *   message_edit: (boolean|undefined),
     *   message_allow: (boolean|undefined),
     *   message_deny: (boolean|undefined),
     *   photo_new: (boolean|undefined),
     *   audio_new: (boolean|undefined),
     *   video_new: (boolean|undefined),
     *   wall_reply_new: (boolean|undefined),
     *   wall_reply_edit: (boolean|undefined),
     *   wall_reply_delete: (boolean|undefined),
     *   wall_reply_restore: (boolean|undefined),
     *   wall_post_new: (boolean|undefined),
     *   wall_repost: (boolean|undefined),
     *   board_post_new: (boolean|undefined),
     *   board_post_edit: (boolean|undefined),
     *   board_post_restore: (boolean|undefined),
     *   board_post_delete: (boolean|undefined),
     *   photo_comment_new: (boolean|undefined),
     *   photo_comment_edit: (boolean|undefined),
     *   photo_comment_delete: (boolean|undefined),
     *   photo_comment_restore: (boolean|undefined),
     *   video_comment_new: (boolean|undefined),
     *   video_comment_edit: (boolean|undefined),
     *   video_comment_delete: (boolean|undefined),
     *   video_comment_restore: (boolean|undefined),
     *   market_comment_new: (boolean|undefined),
     *   market_comment_edit: (boolean|undefined),
     *   market_comment_delete: (boolean|undefined),
     *   market_comment_restore: (boolean|undefined),
     *   poll_vote_new: (boolean|undefined),
     *   group_join: (boolean|undefined),
     *   group_leave: (boolean|undefined),
     *   user_block: (boolean|undefined),
     *   user_unblock: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    groupsSetLongPollSettings(params: MethodsProps.GroupsSetLongPollSettingsParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of topics on a community's discussion board.
     *
     * @param {{
     *   group_id: (number),
     *   topic_ids: (number[]|undefined),
     *   order: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   preview: (number|undefined),
     *   preview_length: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.BoardGetTopicsResponse>}
     */
    boardGetTopics(params: MethodsProps.BoardGetTopicsParams): Promise<Responses.BoardGetTopicsResponse>;
    /**
     * Returns a list of comments on a topic on a community's discussion board.
     *
     * @param {{
     *   group_id: (number),
     *   topic_id: (number),
     *   need_likes: (boolean|undefined),
     *   start_comment_id: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   sort: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.BoardGetCommentsResponse>}
     */
    boardGetComments(params: MethodsProps.BoardGetCommentsParams): Promise<Responses.BoardGetCommentsResponse>;
    /**
     * Creates a new topic on a community's discussion board.
     *
     * @param {{
     *   group_id: (number),
     *   title: (string),
     *   text: (string|undefined),
     *   from_group: (boolean|undefined),
     *   attachments: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.BoardAddTopicResponse>}
     */
    boardAddTopic(params: MethodsProps.BoardAddTopicParams): Promise<Responses.BoardAddTopicResponse>;
    /**
     * Adds a comment on a topic on a community's discussion board.
     *
     * @param {{
     *   group_id: (number),
     *   topic_id: (number),
     *   message: (string|undefined),
     *   attachments: (string[]|undefined),
     *   from_group: (boolean|undefined),
     *   sticker_id: (number|undefined),
     *   guid: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.BoardCreateCommentResponse>}
     */
    boardCreateComment(params: MethodsProps.BoardCreateCommentParams): Promise<Responses.BoardCreateCommentResponse>;
    /**
     * Deletes a topic from a community's discussion board.
     *
     * @param {{
     *   group_id: (number),
     *   topic_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    boardDeleteTopic(params: MethodsProps.BoardDeleteTopicParams): Promise<Responses.OkResponse>;
    /**
     * Edits the title of a topic on a community's discussion board.
     *
     * @param {{
     *   group_id: (number),
     *   topic_id: (number),
     *   title: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    boardEditTopic(params: MethodsProps.BoardEditTopicParams): Promise<Responses.OkResponse>;
    /**
     * Edits a comment on a topic on a community's discussion board.
     *
     * @param {{
     *   group_id: (number),
     *   topic_id: (number),
     *   comment_id: (number),
     *   message: (string|undefined),
     *   attachments: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    boardEditComment(params: MethodsProps.BoardEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Restores a comment deleted from a topic on a community's discussion board.
     *
     * @param {{
     *   group_id: (number),
     *   topic_id: (number),
     *   comment_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    boardRestoreComment(params: MethodsProps.BoardRestoreCommentParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a comment on a topic on a community's discussion board.
     *
     * @param {{
     *   group_id: (number),
     *   topic_id: (number),
     *   comment_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    boardDeleteComment(params: MethodsProps.BoardDeleteCommentParams): Promise<Responses.OkResponse>;
    /**
     * Re-opens a previously closed topic on a community's discussion board.
     *
     * @param {{
     *   group_id: (number),
     *   topic_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    boardOpenTopic(params: MethodsProps.BoardOpenTopicParams): Promise<Responses.OkResponse>;
    /**
     * Closes a topic on a community's discussion board so that comments cannot be posted.
     *
     * @param {{
     *   group_id: (number),
     *   topic_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    boardCloseTopic(params: MethodsProps.BoardCloseTopicParams): Promise<Responses.OkResponse>;
    /**
     * Pins a topic (fixes its place) to the top of a community's discussion board.
     *
     * @param {{
     *   group_id: (number),
     *   topic_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    boardFixTopic(params: MethodsProps.BoardFixTopicParams): Promise<Responses.OkResponse>;
    /**
     * Unpins a pinned topic from the top of a community's discussion board.
     *
     * @param {{
     *   group_id: (number),
     *   topic_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    boardUnfixTopic(params: MethodsProps.BoardUnfixTopicParams): Promise<Responses.OkResponse>;
    /**
     * Returns detailed information about videos.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   videos: (string[]|undefined),
     *   album_id: (number|undefined),
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoGetResponse>}
     */
    videoGet(params: MethodsProps.VideoGetParams): Promise<Responses.VideoGetResponse>;
    /**
     * Edits information about a video on a user or community page.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   video_id: (number),
     *   name: (string|undefined),
     *   desc: (string|undefined),
     *   privacy_view: (string[]|undefined),
     *   privacy_comment: (string[]|undefined),
     *   no_comments: (boolean|undefined),
     *   repeat: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoEdit(params: MethodsProps.VideoEditParams): Promise<Responses.OkResponse>;
    /**
     * Adds a video to a user or community page.
     *
     * @param {{
     *   target_id: (number|undefined),
     *   video_id: (number),
     *   owner_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoAdd(params: MethodsProps.VideoAddParams): Promise<Responses.OkResponse>;
    /**
     * Returns a server address (required for upload) and video data.
     *
     * @param {{
     *   name: (string|undefined),
     *   description: (string|undefined),
     *   is_private: (boolean|undefined),
     *   wallpost: (boolean|undefined),
     *   link: (string|undefined),
     *   group_id: (number|undefined),
     *   album_id: (number|undefined),
     *   privacy_view: (string[]|undefined),
     *   privacy_comment: (string[]|undefined),
     *   no_comments: (boolean|undefined),
     *   repeat: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoSaveResponse>}
     */
    videoSave(params: MethodsProps.VideoSaveParams): Promise<Responses.VideoSaveResponse>;
    /**
     * Deletes a video from a user or community page.
     *
     * @param {{
     *   video_id: (number),
     *   owner_id: (number|undefined),
     *   target_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoDelete(params: MethodsProps.VideoDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Restores a previously deleted video.
     *
     * @param {{
     *   video_id: (number),
     *   owner_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoRestore(params: MethodsProps.VideoRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of videos under the set search criterion.
     *
     * @param {{
     *   q: (string),
     *   sort: (number|undefined),
     *   hd: (number|undefined),
     *   adult: (boolean|undefined),
     *   filters: (string[]|undefined),
     *   search_own: (boolean|undefined),
     *   offset: (number|undefined),
     *   longer: (number|undefined),
     *   shorter: (number|undefined),
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoSearchResponse>}
     */
    videoSearch(params: MethodsProps.VideoSearchParams): Promise<Responses.VideoSearchResponse>;
    /**
     * Returns list of videos in which the user is tagged.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoGetUserVideosResponse>}
     */
    videoGetUserVideos(params: MethodsProps.VideoGetUserVideosParams): Promise<Responses.VideoGetUserVideosResponse>;
    /**
     * Returns a list of video albums owned by a user or community.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoGetAlbumsResponse>}
     */
    videoGetAlbums(params: MethodsProps.VideoGetAlbumsParams): Promise<Responses.VideoGetAlbumsResponse>;
    /**
     * Returns video album info
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   album_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoGetAlbumByIdResponse>}
     */
    videoGetAlbumById(params: MethodsProps.VideoGetAlbumByIdParams): Promise<Responses.VideoGetAlbumByIdResponse>;
    /**
     * Creates an empty album for videos.
     *
     * @param {{
     *   group_id: (number|undefined),
     *   title: (string|undefined),
     *   privacy: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoAddAlbumResponse>}
     */
    videoAddAlbum(params: MethodsProps.VideoAddAlbumParams): Promise<Responses.VideoAddAlbumResponse>;
    /**
     * Edits the title of a video album.
     *
     * @param {{
     *   group_id: (number|undefined),
     *   album_id: (number),
     *   title: (string),
     *   privacy: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoEditAlbum(params: MethodsProps.VideoEditAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a video album.
     *
     * @param {{
     *   group_id: (number|undefined),
     *   album_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoDeleteAlbum(params: MethodsProps.VideoDeleteAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the album in the list of user video albums.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   album_id: (number),
     *   before: (number|undefined),
     *   after: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoReorderAlbums(params: MethodsProps.VideoReorderAlbumsParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the video in the video album.
     *
     * @param {{
     *   target_id: (number|undefined),
     *   album_id: (number|undefined),
     *   owner_id: (number),
     *   video_id: (number),
     *   before_owner_id: (number|undefined),
     *   before_video_id: (number|undefined),
     *   after_owner_id: (number|undefined),
     *   after_video_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoReorderVideos(params: MethodsProps.VideoReorderVideosParams): Promise<Responses.OkResponse>;
    /**
     * undefined
     *
     * @param {{
     *   target_id: (number|undefined),
     *   album_id: (number|undefined),
     *   album_ids: (number[]|undefined),
     *   owner_id: (number),
     *   video_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoAddToAlbum(params: MethodsProps.VideoAddToAlbumParams): Promise<Responses.OkResponse>;
    /**
     * undefined
     *
     * @param {{
     *   target_id: (number|undefined),
     *   album_id: (number|undefined),
     *   album_ids: (number[]|undefined),
     *   owner_id: (number),
     *   video_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoRemoveFromAlbum(params: MethodsProps.VideoRemoveFromAlbumParams): Promise<Responses.OkResponse>;
    /**
     * undefined
     *
     * @param {{
     *   target_id: (number|undefined),
     *   owner_id: (number),
     *   video_id: (number),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoGetAlbumsByVideoResponse>}
     */
    videoGetAlbumsByVideo(params: MethodsProps.VideoGetAlbumsByVideoParams): Promise<Responses.VideoGetAlbumsByVideoResponse>;
    /**
     * Returns a list of comments on a video.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   video_id: (number),
     *   need_likes: (boolean|undefined),
     *   start_comment_id: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   sort: (string|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoGetCommentsResponse>}
     */
    videoGetComments(params: MethodsProps.VideoGetCommentsParams): Promise<Responses.VideoGetCommentsResponse>;
    /**
     * Adds a new comment on a video.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   video_id: (number),
     *   message: (string|undefined),
     *   attachments: (string[]|undefined),
     *   from_group: (boolean|undefined),
     *   reply_to_comment: (number|undefined),
     *   sticker_id: (number|undefined),
     *   guid: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoCreateCommentResponse>}
     */
    videoCreateComment(params: MethodsProps.VideoCreateCommentParams): Promise<Responses.VideoCreateCommentResponse>;
    /**
     * Deletes a comment on a video.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   comment_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoDeleteComment(params: MethodsProps.VideoDeleteCommentParams): Promise<Responses.OkResponse>;
    /**
     * Restores a previously deleted comment on a video.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   comment_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoRestoreCommentResponse>}
     */
    videoRestoreComment(params: MethodsProps.VideoRestoreCommentParams): Promise<Responses.VideoRestoreCommentResponse>;
    /**
     * Edits the text of a comment on a video.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   comment_id: (number),
     *   message: (string|undefined),
     *   attachments: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoEditComment(params: MethodsProps.VideoEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of tags on a video.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   video_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoGetTagsResponse>}
     */
    videoGetTags(params: MethodsProps.VideoGetTagsParams): Promise<Responses.VideoGetTagsResponse>;
    /**
     * Adds a tag on a video.
     *
     * @param {{
     *   user_id: (number),
     *   owner_id: (number|undefined),
     *   video_id: (number),
     *   tagged_name: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoPutTagResponse>}
     */
    videoPutTag(params: MethodsProps.VideoPutTagParams): Promise<Responses.VideoPutTagResponse>;
    /**
     * Removes a tag from a video.
     *
     * @param {{
     *   tag_id: (number),
     *   owner_id: (number|undefined),
     *   video_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoRemoveTag(params: MethodsProps.VideoRemoveTagParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of videos with tags that have not been viewed.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoGetNewTagsResponse>}
     */
    videoGetNewTags(params: MethodsProps.VideoGetNewTagsParams): Promise<Responses.VideoGetNewTagsResponse>;
    /**
     * Reports (submits a complaint about) a video.
     *
     * @param {{
     *   owner_id: (number),
     *   video_id: (number),
     *   reason: (number|undefined),
     *   comment: (string|undefined),
     *   search_query: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoReport(params: MethodsProps.VideoReportParams): Promise<Responses.OkResponse>;
    /**
     * Reports (submits a complaint about) a comment on a video.
     *
     * @param {{
     *   owner_id: (number),
     *   comment_id: (number),
     *   reason: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoReportComment(params: MethodsProps.VideoReportCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns video catalog
     *
     * @param {{
     *   count: (number|undefined),
     *   items_count: (number|undefined),
     *   from: (string|undefined),
     *   filters: (string[]|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoGetCatalogResponse>}
     */
    videoGetCatalog(params: MethodsProps.VideoGetCatalogParams): Promise<Responses.VideoGetCatalogResponse>;
    /**
     * Returns a separate catalog section
     *
     * @param {{
     *   section_id: (string),
     *   from: (string),
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.VideoGetCatalogSectionResponse>}
     */
    videoGetCatalogSection(params: MethodsProps.VideoGetCatalogSectionParams): Promise<Responses.VideoGetCatalogSectionResponse>;
    /**
     * Hides a video catalog section from a user.
     *
     * @param {{
     *   section_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    videoHideCatalogSection(params: MethodsProps.VideoHideCatalogSectionParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of notes created by a user.
     *
     * @param {{
     *   note_ids: (number[]|undefined),
     *   user_id: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NotesGetResponse>}
     */
    notesGet(params: MethodsProps.NotesGetParams): Promise<Responses.NotesGetResponse>;
    /**
     * Returns a note by its ID.
     *
     * @param {{
     *   note_id: (number),
     *   owner_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NotesGetByIdResponse>}
     */
    notesGetById(params: MethodsProps.NotesGetByIdParams): Promise<Responses.NotesGetByIdResponse>;
    /**
     * Creates a new note for the current user.
     *
     * @param {{
     *   title: (string),
     *   text: (string),
     *   privacy_view: (string[]|undefined),
     *   privacy_comment: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NotesAddResponse>}
     */
    notesAdd(params: MethodsProps.NotesAddParams): Promise<Responses.NotesAddResponse>;
    /**
     * Edits a note of the current user.
     *
     * @param {{
     *   note_id: (number),
     *   title: (string),
     *   text: (string),
     *   privacy_view: (string[]|undefined),
     *   privacy_comment: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    notesEdit(params: MethodsProps.NotesEditParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a note of the current user.
     *
     * @param {{
     *   note_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    notesDelete(params: MethodsProps.NotesDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of comments on a note.
     *
     * @param {{
     *   note_id: (number),
     *   owner_id: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NotesGetCommentsResponse>}
     */
    notesGetComments(params: MethodsProps.NotesGetCommentsParams): Promise<Responses.NotesGetCommentsResponse>;
    /**
     * Adds a new comment on a note.
     *
     * @param {{
     *   note_id: (number),
     *   owner_id: (number|undefined),
     *   reply_to: (number|undefined),
     *   message: (string),
     *   guid: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NotesCreateCommentResponse>}
     */
    notesCreateComment(params: MethodsProps.NotesCreateCommentParams): Promise<Responses.NotesCreateCommentResponse>;
    /**
     * Edits a comment on a note.
     *
     * @param {{
     *   comment_id: (number),
     *   owner_id: (number|undefined),
     *   message: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    notesEditComment(params: MethodsProps.NotesEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a comment on a note.
     *
     * @param {{
     *   comment_id: (number),
     *   owner_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    notesDeleteComment(params: MethodsProps.NotesDeleteCommentParams): Promise<Responses.OkResponse>;
    /**
     * Restores a deleted comment on a note.
     *
     * @param {{
     *   comment_id: (number),
     *   owner_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    notesRestoreComment(params: MethodsProps.NotesRestoreCommentParams): Promise<Responses.OkResponse>;
    /**
     * Adds a new location to the location database.
     *
     * @param {{
     *   type: (number|undefined),
     *   title: (string),
     *   latitude: (number),
     *   longitude: (number),
     *   country: (number|undefined),
     *   city: (number|undefined),
     *   address: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PlacesAddResponse>}
     */
    placesAdd(params: MethodsProps.PlacesAddParams): Promise<Responses.PlacesAddResponse>;
    /**
     * Returns information about locations by their IDs.
     *
     * @param {{
     *   places: (number[]),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PlacesGetByIdResponse>}
     */
    placesGetById(params: MethodsProps.PlacesGetByIdParams): Promise<Responses.PlacesGetByIdResponse>;
    /**
     * Returns a list of locations that match the search criteria.
     *
     * @param {{
     *   q: (string|undefined),
     *   city: (number|undefined),
     *   latitude: (number),
     *   longitude: (number),
     *   radius: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PlacesSearchResponse>}
     */
    placesSearch(params: MethodsProps.PlacesSearchParams): Promise<Responses.PlacesSearchResponse>;
    /**
     * Checks a user in at the specified location.
     *
     * @param {{
     *   place_id: (number|undefined),
     *   text: (string|undefined),
     *   latitude: (number|undefined),
     *   longitude: (number|undefined),
     *   friends_only: (boolean|undefined),
     *   services: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PlacesCheckinResponse>}
     */
    placesCheckin(params: MethodsProps.PlacesCheckinParams): Promise<Responses.PlacesCheckinResponse>;
    /**
     * Returns a list of user check-ins at locations according to the set parameters.
     *
     * @param {{
     *   latitude: (number|undefined),
     *   longitude: (number|undefined),
     *   place: (number|undefined),
     *   user_id: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   timestamp: (number|undefined),
     *   friends_only: (boolean|undefined),
     *   need_places: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PlacesGetCheckinsResponse>}
     */
    placesGetCheckins(params: MethodsProps.PlacesGetCheckinsParams): Promise<Responses.PlacesGetCheckinsResponse>;
    /**
     * Returns a list of all types of locations.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PlacesGetTypesResponse>}
     */
    placesGetTypes(params: MethodsProps.PlacesGetTypesParams): Promise<Responses.PlacesGetTypesResponse>;
    /**
     * Returns non-null values of user counters.
     *
     * @param {{
     *   filter: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AccountGetCountersResponse>}
     */
    accountGetCounters(params: MethodsProps.AccountGetCountersParams): Promise<Responses.AccountGetCountersResponse>;
    /**
     * Sets an application screen name (up to 17 characters), that is shown to the user in the left menu.
     *
     * @param {{
     *   user_id: (number),
     *   name: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    accountSetNameInMenu(params: MethodsProps.AccountSetNameInMenuParams): Promise<Responses.OkResponse>;
    /**
     * Marks the current user as online for 15 minutes.
     *
     * @param {{
     *   voip: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    accountSetOnline(params: MethodsProps.AccountSetOnlineParams): Promise<Responses.OkResponse>;
    /**
     * Marks a current user as offline.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    accountSetOffline(params: MethodsProps.AccountSetOfflineParams): Promise<Responses.OkResponse>;
    /**
     * Allows to search the VK users using phone numbers, e-mail addresses and user IDs on other services.
     *
     * @param {{
     *   contacts: (string[]|undefined),
     *   service: (string),
     *   mycontact: (string|undefined),
     *   return_all: (boolean|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AccountLookupContactsResponse>}
     */
    accountLookupContacts(params: MethodsProps.AccountLookupContactsParams): Promise<Responses.AccountLookupContactsResponse>;
    /**
     * Subscribes an iOS/Android/Windows Phone-based device to receive push notifications
     *
     * @param {{
     *   token: (string),
     *   device_model: (string|undefined),
     *   device_year: (number|undefined),
     *   device_id: (string),
     *   system_version: (string|undefined),
     *   settings: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    accountRegisterDevice(params: MethodsProps.AccountRegisterDeviceParams): Promise<Responses.OkResponse>;
    /**
     * Unsubscribes a device from push notifications.
     *
     * @param {{
     *   device_id: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    accountUnregisterDevice(params: MethodsProps.AccountUnregisterDeviceParams): Promise<Responses.OkResponse>;
    /**
     * Mutes push notifications for the set period of time.
     *
     * @param {{
     *   device_id: (string|undefined),
     *   time: (number|undefined),
     *   peer_id: (number|undefined),
     *   sound: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    accountSetSilenceMode(params: MethodsProps.AccountSetSilenceModeParams): Promise<Responses.OkResponse>;
    /**
     * Gets settings of push notifications.
     *
     * @param {{
     *   device_id: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AccountGetPushSettingsResponse>}
     */
    accountGetPushSettings(params: MethodsProps.AccountGetPushSettingsParams): Promise<Responses.AccountGetPushSettingsResponse>;
    /**
     * Change push settings.
     *
     * @param {{
     *   device_id: (string),
     *   settings: (string|undefined),
     *   key: (string|undefined),
     *   value: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    accountSetPushSettings(params: MethodsProps.AccountSetPushSettingsParams): Promise<Responses.OkResponse>;
    /**
     * Gets settings of the user in this application.
     *
     * @param {{
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AccountGetAppPermissionsResponse>}
     */
    accountGetAppPermissions(params: MethodsProps.AccountGetAppPermissionsParams): Promise<Responses.AccountGetAppPermissionsResponse>;
    /**
     * Returns a list of active ads (offers) which executed by the user will bring him/her respective number of votes to his balance in the application.
     *
     * @param {{
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AccountGetActiveOffersResponse>}
     */
    accountGetActiveOffers(params: MethodsProps.AccountGetActiveOffersParams): Promise<Responses.AccountGetActiveOffersResponse>;
    /**
     * Adds user to the banlist.
     *
     * @param {{
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    accountBanUser(params: MethodsProps.AccountBanUserParams): Promise<Responses.OkResponse>;
    /**
     * Deletes user from the blacklist.
     *
     * @param {{
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    accountUnbanUser(params: MethodsProps.AccountUnbanUserParams): Promise<Responses.OkResponse>;
    /**
     * Returns a user's blacklist.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AccountGetBannedResponse>}
     */
    accountGetBanned(params: MethodsProps.AccountGetBannedParams): Promise<Responses.AccountGetBannedResponse>;
    /**
     * Returns current account info.
     *
     * @param {{
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AccountGetInfoResponse>}
     */
    accountGetInfo(params: MethodsProps.AccountGetInfoParams): Promise<Responses.AccountGetInfoResponse>;
    /**
     * Allows to edit the current account info.
     *
     * @param {{
     *   name: (string|undefined),
     *   value: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    accountSetInfo(params: MethodsProps.AccountSetInfoParams): Promise<Responses.OkResponse>;
    /**
     * Changes a user password after access is successfully restored with the [vk.com/dev/auth.restore|auth.restore] method.
     *
     * @param {{
     *   restore_sid: (string|undefined),
     *   change_password_hash: (string|undefined),
     *   old_password: (string|undefined),
     *   new_password: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AccountChangePasswordResponse>}
     */
    accountChangePassword(params: MethodsProps.AccountChangePasswordParams): Promise<Responses.AccountChangePasswordResponse>;
    /**
     * Returns the current account info.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AccountGetProfileInfoResponse>}
     */
    accountGetProfileInfo(params: MethodsProps.AccountGetProfileInfoParams): Promise<Responses.AccountGetProfileInfoResponse>;
    /**
     * Edits current profile info.
     *
     * @param {{
     *   first_name: (string|undefined),
     *   last_name: (string|undefined),
     *   maiden_name: (string|undefined),
     *   screen_name: (string|undefined),
     *   cancel_request_id: (number|undefined),
     *   sex: (number|undefined),
     *   relation: (number|undefined),
     *   relation_partner_id: (number|undefined),
     *   bdate: (string|undefined),
     *   bdate_visibility: (number|undefined),
     *   home_town: (string|undefined),
     *   country_id: (number|undefined),
     *   city_id: (number|undefined),
     *   status: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AccountSaveProfileInfoResponse>}
     */
    accountSaveProfileInfo(params: MethodsProps.AccountSaveProfileInfoParams): Promise<Responses.AccountSaveProfileInfoResponse>;
    /**
     * Returns a list of the current user's incoming or outgoing private messages.
     *
     * @param {{
     *   out: (boolean|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   filter: (number|undefined),
     *   time_offset: (number|undefined),
     *   preview_length: (number|undefined),
     *   last_message_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesGetResponse>}
     */
    messagesGet(params: MethodsProps.MessagesGetParams): Promise<Responses.MessagesGetResponse>;
    /**
     * Returns a list of the current user's conversations.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   start_message_id: (number|undefined),
     *   preview_length: (number|undefined),
     *   unread: (boolean|undefined),
     *   important: (boolean|undefined),
     *   unanswered: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesGetDialogsResponse>}
     */
    messagesGetDialogs(params: MethodsProps.MessagesGetDialogsParams): Promise<Responses.MessagesGetDialogsResponse>;
    /**
     * Returns messages by their IDs.
     *
     * @param {{
     *   message_ids: (number[]),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesGetByIdResponse>}
     */
    messagesGetById(params: MethodsProps.MessagesGetByIdParams): Promise<Responses.MessagesGetByIdResponse>;
    /**
     * Returns a list of the current user's private messages that match search criteria.
     *
     * @param {{
     *   q: (string|undefined),
     *   peer_id: (number|undefined),
     *   date: (number|undefined),
     *   preview_length: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesSearchResponse>}
     */
    messagesSearch(params: MethodsProps.MessagesSearchParams): Promise<Responses.MessagesSearchResponse>;
    /**
     * Returns message history for the specified user or group chat.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   user_id: (number|undefined),
     *   peer_id: (number|undefined),
     *   start_message_id: (number|undefined),
     *   rev: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesGetHistoryResponse>}
     */
    messagesGetHistory(params: MethodsProps.MessagesGetHistoryParams): Promise<Responses.MessagesGetHistoryResponse>;
    /**
     * Returns media files from the dialog or group chat.
     *
     * @param {{
     *   peer_id: (number),
     *   media_type: (string|undefined),
     *   start_from: (string|undefined),
     *   count: (number|undefined),
     *   photo_sizes: (boolean|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesGetHistoryAttachmentsResponse>}
     */
    messagesGetHistoryAttachments(params: MethodsProps.MessagesGetHistoryAttachmentsParams): Promise<Responses.MessagesGetHistoryAttachmentsResponse>;
    /**
     * Sends a message.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   random_id: (number|undefined),
     *   peer_id: (number|undefined),
     *   domain: (string|undefined),
     *   chat_id: (number|undefined),
     *   user_ids: (number[]|undefined),
     *   message: (string|undefined),
     *   lat: (number|undefined),
     *   long: (number|undefined),
     *   attachment: (string|undefined),
     *   forward_messages: (string|undefined),
     *   sticker_id: (number|undefined),
     *   notification: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesSendResponse>}
     */
    messagesSend(params: MethodsProps.MessagesSendParams): Promise<Responses.MessagesSendResponse>;
    /**
     * Deletes one or more messages.
     *
     * @param {{
     *   message_ids: (number[]|undefined),
     *   spam: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesDeleteResponse>}
     */
    messagesDelete(params: MethodsProps.MessagesDeleteParams): Promise<Responses.MessagesDeleteResponse>;
    /**
     * Deletes all private messages in a conversation.
     *
     * @param {{
     *   user_id: (string|undefined),
     *   peer_id: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    messagesDeleteDialog(params: MethodsProps.MessagesDeleteDialogParams): Promise<Responses.OkResponse>;
    /**
     * Restores a deleted message.
     *
     * @param {{
     *   message_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    messagesRestore(params: MethodsProps.MessagesRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Marks messages as read.
     *
     * @param {{
     *   message_ids: (number[]|undefined),
     *   peer_id: (string|undefined),
     *   start_message_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    messagesMarkAsRead(params: MethodsProps.MessagesMarkAsReadParams): Promise<Responses.OkResponse>;
    /**
     * Marks and unmarks messages as important (starred).
     *
     * @param {{
     *   message_ids: (number[]|undefined),
     *   important: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesMarkAsImportantResponse>}
     */
    messagesMarkAsImportant(params: MethodsProps.MessagesMarkAsImportantParams): Promise<Responses.MessagesMarkAsImportantResponse>;
    /**
     * Marks and unmarks dialogs as important.
     *
     * @param {{
     *   peer_id: (number[]|undefined),
     *   important: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    messagesMarkAsImportantDialog(params: MethodsProps.MessagesMarkAsImportantDialogParams): Promise<Responses.OkResponse>;
    /**
     * Marks and unmarks dialogs as unanswered.
     *
     * @param {{
     *   peer_id: (number[]|undefined),
     *   important: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    messagesMarkAsUnansweredDialog(params: MethodsProps.MessagesMarkAsUnansweredDialogParams): Promise<Responses.OkResponse>;
    /**
     * Returns data required for connection to a Long Poll server.
     *
     * @param {{
     *   lp_version: (number|undefined),
     *   need_pts: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesGetLongPollServerResponse>}
     */
    messagesGetLongPollServer(params: MethodsProps.MessagesGetLongPollServerParams): Promise<Responses.MessagesGetLongPollServerResponse>;
    /**
     * Returns updates in user's private messages.
     *
     * @param {{
     *   ts: (number|undefined),
     *   pts: (number|undefined),
     *   preview_length: (number|undefined),
     *   onlines: (boolean|undefined),
     *   fields: (string[]|undefined),
     *   events_limit: (number|undefined),
     *   msgs_limit: (number|undefined),
     *   max_msg_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesGetLongPollHistoryResponse>}
     */
    messagesGetLongPollHistory(params: MethodsProps.MessagesGetLongPollHistoryParams): Promise<Responses.MessagesGetLongPollHistoryResponse>;
    /**
     * Returns information about a chat.
     *
     * @param {{
     *   chat_id: (number|undefined),
     *   chat_ids: (number[]|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesGetChatResponse>}
     */
    messagesGetChat(params: MethodsProps.MessagesGetChatParams): Promise<Responses.MessagesGetChatResponse>;
    /**
     * Creates a chat with several participants.
     *
     * @param {{
     *   user_ids: (number[]),
     *   title: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesCreateChatResponse>}
     */
    messagesCreateChat(params: MethodsProps.MessagesCreateChatParams): Promise<Responses.MessagesCreateChatResponse>;
    /**
     * Edits the title of a chat.
     *
     * @param {{
     *   chat_id: (number),
     *   title: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    messagesEditChat(params: MethodsProps.MessagesEditChatParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of IDs of users participating in a chat.
     *
     * @param {{
     *   chat_id: (number|undefined),
     *   chat_ids: (number[]|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesGetChatUsersResponse>}
     */
    messagesGetChatUsers(params: MethodsProps.MessagesGetChatUsersParams): Promise<Responses.MessagesGetChatUsersResponse>;
    /**
     * Changes the status of a user as typing in a conversation.
     *
     * @param {{
     *   user_id: (string|undefined),
     *   type: (string|undefined),
     *   peer_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    messagesSetActivity(params: MethodsProps.MessagesSetActivityParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of the current user's conversations that match search criteria.
     *
     * @param {{
     *   q: (string|undefined),
     *   limit: (number|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesSearchDialogsResponse>}
     */
    messagesSearchDialogs(params: MethodsProps.MessagesSearchDialogsParams): Promise<Responses.MessagesSearchDialogsResponse>;
    /**
     * Adds a new user to a chat.
     *
     * @param {{
     *   chat_id: (number),
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    messagesAddChatUser(params: MethodsProps.MessagesAddChatUserParams): Promise<Responses.OkResponse>;
    /**
     * Allows the current user to leave a chat or, if the current user started the chat, allows the user to remove another user from the chat.
     *
     * @param {{
     *   chat_id: (number),
     *   user_id: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    messagesRemoveChatUser(params: MethodsProps.MessagesRemoveChatUserParams): Promise<Responses.OkResponse>;
    /**
     * Returns a user's current status and date of last activity.
     *
     * @param {{
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesGetLastActivityResponse>}
     */
    messagesGetLastActivity(params: MethodsProps.MessagesGetLastActivityParams): Promise<Responses.MessagesGetLastActivityResponse>;
    /**
     * Sets a previously-uploaded picture as the cover picture of a chat.
     *
     * @param {{
     *   file: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesSetChatPhotoResponse>}
     */
    messagesSetChatPhoto(params: MethodsProps.MessagesSetChatPhotoParams): Promise<Responses.MessagesSetChatPhotoResponse>;
    /**
     * Deletes a chat's cover picture.
     *
     * @param {{
     *   chat_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesDeleteChatPhotoResponse>}
     */
    messagesDeleteChatPhoto(params: MethodsProps.MessagesDeleteChatPhotoParams): Promise<Responses.MessagesDeleteChatPhotoResponse>;
    /**
     * Denies sending message from community to the current user.
     *
     * @param {{
     *   group_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    messagesDenyMessagesFromGroup(params: MethodsProps.MessagesDenyMessagesFromGroupParams): Promise<Responses.OkResponse>;
    /**
     * Allows sending messages from community to the current user.
     *
     * @param {{
     *   group_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    messagesAllowMessagesFromGroup(params: MethodsProps.MessagesAllowMessagesFromGroupParams): Promise<Responses.OkResponse>;
    /**
     * Returns information whether sending messages from the community to current user is allowed.
     *
     * @param {{
     *   group_id: (number),
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MessagesIsMessagesFromGroupAllowedResponse>}
     */
    messagesIsMessagesFromGroupAllowed(params: MethodsProps.MessagesIsMessagesFromGroupAllowedParams): Promise<Responses.MessagesIsMessagesFromGroupAllowedResponse>;
    /**
     * Returns data required to show newsfeed for the current user.
     *
     * @param {{
     *   filters: (string[]|undefined),
     *   return_banned: (boolean|undefined),
     *   start_time: (number|undefined),
     *   end_time: (number|undefined),
     *   max_photos: (number|undefined),
     *   source_ids: (string[]|undefined),
     *   start_from: (string|undefined),
     *   count: (number|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NewsfeedGetResponse>}
     */
    newsfeedGet(params: MethodsProps.NewsfeedGetParams): Promise<Responses.NewsfeedGetResponse>;
    /**
     * , Returns a list of newsfeeds recommended to the current user.
     *
     * @param {{
     *   start_time: (number|undefined),
     *   end_time: (number|undefined),
     *   max_photos: (number|undefined),
     *   start_from: (string|undefined),
     *   count: (number|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NewsfeedGetRecommendedResponse>}
     */
    newsfeedGetRecommended(params: MethodsProps.NewsfeedGetRecommendedParams): Promise<Responses.NewsfeedGetRecommendedResponse>;
    /**
     * Returns a list of comments in the current user's newsfeed.
     *
     * @param {{
     *   count: (number|undefined),
     *   filters: (string[]|undefined),
     *   reposts: (string|undefined),
     *   start_time: (number|undefined),
     *   end_time: (number|undefined),
     *   start_from: (string|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NewsfeedGetCommentsResponse>}
     */
    newsfeedGetComments(params: MethodsProps.NewsfeedGetCommentsParams): Promise<Responses.NewsfeedGetCommentsResponse>;
    /**
     * Returns a list of posts on user walls in which the current user is mentioned.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   start_time: (number|undefined),
     *   end_time: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NewsfeedGetMentionsResponse>}
     */
    newsfeedGetMentions(params: MethodsProps.NewsfeedGetMentionsParams): Promise<Responses.NewsfeedGetMentionsResponse>;
    /**
     * Returns a list of users and communities banned from the current user's newsfeed.
     *
     * @param {{
     *   extended: (boolean|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NewsfeedGetBannedResponse>}
     */
    newsfeedGetBanned(params: MethodsProps.NewsfeedGetBannedParams): Promise<Responses.NewsfeedGetBannedResponse>;
    /**
     * Prevents news from specified users and communities from appearing in the current user's newsfeed.
     *
     * @param {{
     *   user_ids: (number[]|undefined),
     *   group_ids: (number[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    newsfeedAddBan(params: MethodsProps.NewsfeedAddBanParams): Promise<Responses.OkResponse>;
    /**
     * Allows news from previously banned users and communities to be shown in the current user's newsfeed.
     *
     * @param {{
     *   user_ids: (number[]|undefined),
     *   group_ids: (number[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    newsfeedDeleteBan(params: MethodsProps.NewsfeedDeleteBanParams): Promise<Responses.OkResponse>;
    /**
     * Hides an item from the newsfeed.
     *
     * @param {{
     *   type: (string),
     *   owner_id: (number),
     *   item_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    newsfeedIgnoreItem(params: MethodsProps.NewsfeedIgnoreItemParams): Promise<Responses.OkResponse>;
    /**
     * Returns a hidden item to the newsfeed.
     *
     * @param {{
     *   type: (string),
     *   owner_id: (number),
     *   item_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    newsfeedUnignoreItem(params: MethodsProps.NewsfeedUnignoreItemParams): Promise<Responses.OkResponse>;
    /**
     * Returns search results by statuses.
     *
     * @param {{
     *   q: (string|undefined),
     *   extended: (boolean|undefined),
     *   count: (number|undefined),
     *   latitude: (number|undefined),
     *   longitude: (number|undefined),
     *   start_time: (number|undefined),
     *   end_time: (number|undefined),
     *   start_from: (string|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NewsfeedSearchResponse>}
     */
    newsfeedSearch(params: MethodsProps.NewsfeedSearchParams): Promise<Responses.NewsfeedSearchResponse>;
    /**
     * Returns a list of newsfeeds followed by the current user.
     *
     * @param {{
     *   list_ids: (number[]|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NewsfeedGetListsResponse>}
     */
    newsfeedGetLists(params: MethodsProps.NewsfeedGetListsParams): Promise<Responses.NewsfeedGetListsResponse>;
    /**
     * Creates and edits user newsfeed lists
     *
     * @param {{
     *   list_id: (number|undefined),
     *   title: (string),
     *   source_ids: (number[]|undefined),
     *   no_reposts: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NewsfeedSaveListResponse>}
     */
    newsfeedSaveList(params: MethodsProps.NewsfeedSaveListParams): Promise<Responses.NewsfeedSaveListResponse>;
    /**
     * undefined
     *
     * @param {{
     *   list_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    newsfeedDeleteList(params: MethodsProps.NewsfeedDeleteListParams): Promise<Responses.OkResponse>;
    /**
     * Unsubscribes the current user from specified newsfeeds.
     *
     * @param {{
     *   type: (string),
     *   owner_id: (number|undefined),
     *   item_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    newsfeedUnsubscribe(params: MethodsProps.NewsfeedUnsubscribeParams): Promise<Responses.OkResponse>;
    /**
     * Returns communities and users that current user is suggested to follow.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   shuffle: (boolean|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NewsfeedGetSuggestedSourcesResponse>}
     */
    newsfeedGetSuggestedSources(params: MethodsProps.NewsfeedGetSuggestedSourcesParams): Promise<Responses.NewsfeedGetSuggestedSourcesResponse>;
    /**
     * Returns a list of IDs of users who added the specified object to their 'Likes' list.
     *
     * @param {{
     *   type: (string),
     *   owner_id: (number|undefined),
     *   item_id: (number|undefined),
     *   page_url: (string|undefined),
     *   filter: (string|undefined),
     *   friends_only: (boolean|undefined),
     *   extended: (boolean|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   skip_own: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.LikesGetListResponse>}
     */
    likesGetList(params: MethodsProps.LikesGetListParams): Promise<Responses.LikesGetListResponse>;
    /**
     * Adds the specified object to the 'Likes' list of the current user.
     *
     * @param {{
     *   type: (string),
     *   owner_id: (number|undefined),
     *   item_id: (number),
     *   access_key: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.LikesAddResponse>}
     */
    likesAdd(params: MethodsProps.LikesAddParams): Promise<Responses.LikesAddResponse>;
    /**
     * Deletes the specified object from the 'Likes' list of the current user.
     *
     * @param {{
     *   type: (string),
     *   owner_id: (number|undefined),
     *   item_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.LikesDeleteResponse>}
     */
    likesDelete(params: MethodsProps.LikesDeleteParams): Promise<Responses.LikesDeleteResponse>;
    /**
     * Checks for the object in the 'Likes' list of the specified user.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   type: (string),
     *   owner_id: (number|undefined),
     *   item_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.LikesIsLikedResponse>}
     */
    likesIsLiked(params: MethodsProps.LikesIsLikedParams): Promise<Responses.LikesIsLikedResponse>;
    /**
     * Returns detailed information about a poll by its ID.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   is_board: (boolean|undefined),
     *   poll_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PollsGetByIdResponse>}
     */
    pollsGetById(params: MethodsProps.PollsGetByIdParams): Promise<Responses.PollsGetByIdResponse>;
    /**
     * Adds the current user's vote to the selected answer in the poll.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   poll_id: (number),
     *   answer_id: (number),
     *   is_board: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PollsAddVoteResponse>}
     */
    pollsAddVote(params: MethodsProps.PollsAddVoteParams): Promise<Responses.PollsAddVoteResponse>;
    /**
     * Deletes the current user's vote from the selected answer in the poll.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   poll_id: (number),
     *   answer_id: (number),
     *   is_board: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PollsDeleteVoteResponse>}
     */
    pollsDeleteVote(params: MethodsProps.PollsDeleteVoteParams): Promise<Responses.PollsDeleteVoteResponse>;
    /**
     * Returns a list of IDs of users who selected specific answers in the poll.
     *
     * @param {{
     *   owner_id: (number|undefined),
     *   poll_id: (number),
     *   answer_ids: (number[]),
     *   is_board: (boolean|undefined),
     *   friends_only: (boolean|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PollsGetVotersResponse>}
     */
    pollsGetVoters(params: MethodsProps.PollsGetVotersParams): Promise<Responses.PollsGetVotersResponse>;
    /**
     * Creates polls that can be attached to the users' or communities' posts.
     *
     * @param {{
     *   question: (string|undefined),
     *   is_anonymous: (boolean|undefined),
     *   owner_id: (number|undefined),
     *   add_answers: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.PollsCreateResponse>}
     */
    pollsCreate(params: MethodsProps.PollsCreateParams): Promise<Responses.PollsCreateResponse>;
    /**
     * Edits created polls
     *
     * @param {{
     *   owner_id: (number),
     *   poll_id: (number),
     *   question: (string|undefined),
     *   add_answers: (string|undefined),
     *   edit_answers: (string|undefined),
     *   delete_answers: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    pollsEdit(params: MethodsProps.PollsEditParams): Promise<Responses.OkResponse>;
    /**
     * Returns detailed information about user or community documents.
     *
     * @param {{
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   owner_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DocsGetResponse>}
     */
    docsGet(params: MethodsProps.DocsGetParams): Promise<Responses.DocsGetResponse>;
    /**
     * Returns information about documents by their IDs.
     *
     * @param {{
     *   docs: (string[]),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DocsGetByIdResponse>}
     */
    docsGetById(params: MethodsProps.DocsGetByIdParams): Promise<Responses.DocsGetByIdResponse>;
    /**
     * Returns the server address for document upload.
     *
     * @param {{
     *   group_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DocsGetUploadServerResponse>}
     */
    docsGetUploadServer(params: MethodsProps.DocsGetUploadServerParams): Promise<Responses.DocsGetUploadServerResponse>;
    /**
     * Returns the server address for document upload onto a user's or community's wall.
     *
     * @param {{
     *   group_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DocsGetWallUploadServerResponse>}
     */
    docsGetWallUploadServer(params: MethodsProps.DocsGetWallUploadServerParams): Promise<Responses.DocsGetWallUploadServerResponse>;
    /**
     * Saves a document after [vk.com/dev/upload_files_2|uploading it to a server].
     *
     * @param {{
     *   file: (string),
     *   title: (string|undefined),
     *   tags: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DocsSaveResponse>}
     */
    docsSave(params: MethodsProps.DocsSaveParams): Promise<Responses.DocsSaveResponse>;
    /**
     * Deletes a user or community document.
     *
     * @param {{
     *   owner_id: (number),
     *   doc_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    docsDelete(params: MethodsProps.DocsDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Copies a document to a user's or community's document list.
     *
     * @param {{
     *   owner_id: (number),
     *   doc_id: (number),
     *   access_key: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DocsAddResponse>}
     */
    docsAdd(params: MethodsProps.DocsAddParams): Promise<Responses.DocsAddResponse>;
    /**
     * Returns documents types available for current user.
     *
     * @param {{
     *   owner_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DocsGetTypesResponse>}
     */
    docsGetTypes(params: MethodsProps.DocsGetTypesParams): Promise<Responses.DocsGetTypesResponse>;
    /**
     * Returns a list of documents matching the search criteria.
     *
     * @param {{
     *   q: (string),
     *   search_own: (boolean|undefined),
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DocsSearchResponse>}
     */
    docsSearch(params: MethodsProps.DocsSearchParams): Promise<Responses.DocsSearchResponse>;
    /**
     * Edits a document.
     *
     * @param {{
     *   owner_id: (number),
     *   doc_id: (number),
     *   title: (string|undefined),
     *   tags: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    docsEdit(params: MethodsProps.DocsEditParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of users whom the current user has bookmarked.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FaveGetUsersResponse>}
     */
    faveGetUsers(params: MethodsProps.FaveGetUsersParams): Promise<Responses.FaveGetUsersResponse>;
    /**
     * Returns a list of photos that the current user has liked.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   photo_sizes: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FaveGetPhotosResponse>}
     */
    faveGetPhotos(params: MethodsProps.FaveGetPhotosParams): Promise<Responses.FaveGetPhotosResponse>;
    /**
     * Returns a list of wall posts that the current user has liked.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FaveGetPostsResponse>}
     */
    faveGetPosts(params: MethodsProps.FaveGetPostsParams): Promise<Responses.FaveGetPostsResponse>;
    /**
     * Returns a list of videos that the current user has liked.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FaveGetVideosResponse>}
     */
    faveGetVideos(params: MethodsProps.FaveGetVideosParams): Promise<Responses.FaveGetVideosResponse>;
    /**
     * Returns a list of links that the current user has bookmarked.
     *
     * @param {{
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FaveGetLinksResponse>}
     */
    faveGetLinks(params: MethodsProps.FaveGetLinksParams): Promise<Responses.FaveGetLinksResponse>;
    /**
     * Returns market items bookmarked by current user.
     *
     * @param {{
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.FaveGetMarketItemsResponse>}
     */
    faveGetMarketItems(params: MethodsProps.FaveGetMarketItemsParams): Promise<Responses.FaveGetMarketItemsResponse>;
    /**
     * Adds a profile to user faves.
     *
     * @param {{
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    faveAddUser(params: MethodsProps.FaveAddUserParams): Promise<Responses.OkResponse>;
    /**
     * Removes a profile from user faves.
     *
     * @param {{
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    faveRemoveUser(params: MethodsProps.FaveRemoveUserParams): Promise<Responses.OkResponse>;
    /**
     * Adds a community to user faves.
     *
     * @param {{
     *   group_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    faveAddGroup(params: MethodsProps.FaveAddGroupParams): Promise<Responses.OkResponse>;
    /**
     * Removes a community from user faves.
     *
     * @param {{
     *   group_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    faveRemoveGroup(params: MethodsProps.FaveRemoveGroupParams): Promise<Responses.OkResponse>;
    /**
     * Adds a link to user faves.
     *
     * @param {{
     *   link: (string),
     *   text: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    faveAddLink(params: MethodsProps.FaveAddLinkParams): Promise<Responses.OkResponse>;
    /**
     * Removes link from the user's faves.
     *
     * @param {{
     *   link_id: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    faveRemoveLink(params: MethodsProps.FaveRemoveLinkParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of notifications about other users' feedback to the current user's wall posts.
     *
     * @param {{
     *   count: (number|undefined),
     *   start_from: (string|undefined),
     *   filters: (string[]|undefined),
     *   start_time: (number|undefined),
     *   end_time: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NotificationsGetResponse>}
     */
    notificationsGet(params: MethodsProps.NotificationsGetParams): Promise<Responses.NotificationsGetResponse>;
    /**
     * Resets the counter of new notifications about other users' feedback to the current user's wall posts.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.NotificationsMarkAsViewedResponse>}
     */
    notificationsMarkAsViewed(params: MethodsProps.NotificationsMarkAsViewedParams): Promise<Responses.NotificationsMarkAsViewedResponse>;
    /**
     * Returns statistics of a community or an application.
     *
     * @param {{
     *   group_id: (number|undefined),
     *   app_id: (number|undefined),
     *   date_from: (string|undefined),
     *   date_to: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StatsGetResponse>}
     */
    statsGet(params: MethodsProps.StatsGetParams): Promise<Responses.StatsGetResponse>;
    /**
     * undefined
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    statsTrackVisitor(params: MethodsProps.StatsTrackVisitorParams): Promise<Responses.OkResponse>;
    /**
     * Returns stats for a wall post.
     *
     * @param {{
     *   owner_id: (number),
     *   post_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.StatsGetPostReachResponse>}
     */
    statsGetPostReach(params: MethodsProps.StatsGetPostReachParams): Promise<Responses.StatsGetPostReachResponse>;
    /**
     * Allows the programmer to do a quick search for any substring.
     *
     * @param {{
     *   q: (string|undefined),
     *   offset: (number|undefined),
     *   limit: (number|undefined),
     *   filters: (string[]|undefined),
     *   search_global: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.SearchGetHintsResponse>}
     */
    searchGetHints(params: MethodsProps.SearchGetHintsParams): Promise<Responses.SearchGetHintsResponse>;
    /**
     * Returns a list of applications (apps) available to users in the App Catalog.
     *
     * @param {{
     *   sort: (string|undefined),
     *   offset: (number|undefined),
     *   count: (number),
     *   platform: (string|undefined),
     *   extended: (boolean|undefined),
     *   return_friends: (boolean|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   q: (string|undefined),
     *   genre_id: (number|undefined),
     *   filter: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AppsGetCatalogResponse>}
     */
    appsGetCatalog(params: MethodsProps.AppsGetCatalogParams): Promise<Responses.AppsGetCatalogResponse>;
    /**
     * Returns applications data.
     *
     * @param {{
     *   app_id: (number|undefined),
     *   app_ids: (string[]|undefined),
     *   platform: (string|undefined),
     *   fields: (string[]|undefined),
     *   name_case: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AppsGetResponse>}
     */
    appsGet(params: MethodsProps.AppsGetParams): Promise<Responses.AppsGetResponse>;
    /**
     * Sends a request to another user in an app that uses VK authorization.
     *
     * @param {{
     *   user_id: (number),
     *   text: (string|undefined),
     *   type: (string|undefined),
     *   name: (string|undefined),
     *   key: (string|undefined),
     *   separate: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AppsSendRequestResponse>}
     */
    appsSendRequest(params: MethodsProps.AppsSendRequestParams): Promise<Responses.AppsSendRequestResponse>;
    /**
     * Deletes all request notifications from the current app.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    appsDeleteAppRequests(params: MethodsProps.AppsDeleteAppRequestsParams): Promise<Responses.OkResponse>;
    /**
     * Creates friends list for requests and invites in current app.
     *
     * @param {{
     *   count: (number|undefined),
     *   type: (string|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AppsGetFriendsListResponse>}
     */
    appsGetFriendsList(params: MethodsProps.AppsGetFriendsListParams): Promise<Responses.AppsGetFriendsListResponse>;
    /**
     * Returns players rating in the game.
     *
     * @param {{
     *   type: (string),
     *   global: (boolean|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AppsGetLeaderboardResponse>}
     */
    appsGetLeaderboard(params: MethodsProps.AppsGetLeaderboardParams): Promise<Responses.AppsGetLeaderboardResponse>;
    /**
     * Adds user activity information to an application
     *
     * @param {{
     *   user_id: (number),
     *   activity_id: (number),
     *   value: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    secureAddAppEvent(params: MethodsProps.SecureAddAppEventParams): Promise<Responses.OkResponse>;
    /**
     * Returns user score in app
     *
     * @param {{
     *   user_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AppsGetScoreResponse>}
     */
    appsGetScore(params: MethodsProps.AppsGetScoreParams): Promise<Responses.AppsGetScoreResponse>;
    /**
     * Checks whether a link is blocked in VK.
     *
     * @param {{
     *   url: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.UtilsCheckLinkResponse>}
     */
    utilsCheckLink(params: MethodsProps.UtilsCheckLinkParams): Promise<Responses.UtilsCheckLinkResponse>;
    /**
     * Deletes shortened link from user's list.
     *
     * @param {{
     *   key: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    utilsDeleteFromLastShortened(params: MethodsProps.UtilsDeleteFromLastShortenedParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of user's shortened links.
     *
     * @param {{
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.UtilsGetLastShortenedLinksResponse>}
     */
    utilsGetLastShortenedLinks(params: MethodsProps.UtilsGetLastShortenedLinksParams): Promise<Responses.UtilsGetLastShortenedLinksResponse>;
    /**
     * Returns stats data for shortened link.
     *
     * @param {{
     *   key: (string),
     *   access_key: (string|undefined),
     *   interval: (string|undefined),
     *   intervals_count: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.UtilsGetLinkStatsResponse>}
     */
    utilsGetLinkStats(params: MethodsProps.UtilsGetLinkStatsParams): Promise<Responses.UtilsGetLinkStatsResponse>;
    /**
     * Allows to receive a link shortened via vk.cc.
     *
     * @param {{
     *   url: (string),
     *   private: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.UtilsGetShortLinkResponse>}
     */
    utilsGetShortLink(params: MethodsProps.UtilsGetShortLinkParams): Promise<Responses.UtilsGetShortLinkResponse>;
    /**
     * Detects a type of object (e.g., user, community, application) and its ID by screen name.
     *
     * @param {{
     *   screen_name: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.UtilsResolveScreenNameResponse>}
     */
    utilsResolveScreenName(params: MethodsProps.UtilsResolveScreenNameParams): Promise<Responses.UtilsResolveScreenNameResponse>;
    /**
     * Returns the current time of the VK server.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.UtilsGetServerTimeResponse>}
     */
    utilsGetServerTime(params: MethodsProps.UtilsGetServerTimeParams): Promise<Responses.UtilsGetServerTimeResponse>;
    /**
     * Returns a list of countries.
     *
     * @param {{
     *   need_all: (boolean|undefined),
     *   code: (string|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DatabaseGetCountriesResponse>}
     */
    databaseGetCountries(params: MethodsProps.DatabaseGetCountriesParams): Promise<Responses.DatabaseGetCountriesResponse>;
    /**
     * Returns a list of regions.
     *
     * @param {{
     *   country_id: (number),
     *   q: (string|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DatabaseGetRegionsResponse>}
     */
    databaseGetRegions(params: MethodsProps.DatabaseGetRegionsParams): Promise<Responses.DatabaseGetRegionsResponse>;
    /**
     * Returns information about streets by their IDs.
     *
     * @param {{
     *   street_ids: (number[]),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DatabaseGetStreetsByIdResponse>}
     */
    databaseGetStreetsById(params: MethodsProps.DatabaseGetStreetsByIdParams): Promise<Responses.DatabaseGetStreetsByIdResponse>;
    /**
     * Returns information about countries by their IDs.
     *
     * @param {{
     *   country_ids: (number[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DatabaseGetCountriesByIdResponse>}
     */
    databaseGetCountriesById(params: MethodsProps.DatabaseGetCountriesByIdParams): Promise<Responses.DatabaseGetCountriesByIdResponse>;
    /**
     * Returns a list of cities.
     *
     * @param {{
     *   country_id: (number),
     *   region_id: (number|undefined),
     *   q: (string|undefined),
     *   need_all: (boolean|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DatabaseGetCitiesResponse>}
     */
    databaseGetCities(params: MethodsProps.DatabaseGetCitiesParams): Promise<Responses.DatabaseGetCitiesResponse>;
    /**
     * Returns information about cities by their IDs.
     *
     * @param {{
     *   city_ids: (number[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DatabaseGetCitiesByIdResponse>}
     */
    databaseGetCitiesById(params: MethodsProps.DatabaseGetCitiesByIdParams): Promise<Responses.DatabaseGetCitiesByIdResponse>;
    /**
     * Returns a list of higher education institutions.
     *
     * @param {{
     *   q: (string|undefined),
     *   country_id: (number|undefined),
     *   city_id: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DatabaseGetUniversitiesResponse>}
     */
    databaseGetUniversities(params: MethodsProps.DatabaseGetUniversitiesParams): Promise<Responses.DatabaseGetUniversitiesResponse>;
    /**
     * Returns a list of schools.
     *
     * @param {{
     *   q: (string|undefined),
     *   city_id: (number),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DatabaseGetSchoolsResponse>}
     */
    databaseGetSchools(params: MethodsProps.DatabaseGetSchoolsParams): Promise<Responses.DatabaseGetSchoolsResponse>;
    /**
     * Returns a list of school classes specified for the country.
     *
     * @param {{
     *   country_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DatabaseGetSchoolClassesResponse>}
     */
    databaseGetSchoolClasses(params: MethodsProps.DatabaseGetSchoolClassesParams): Promise<Responses.DatabaseGetSchoolClassesResponse>;
    /**
     * Returns a list of faculties (i.e., university departments).
     *
     * @param {{
     *   university_id: (number),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DatabaseGetFacultiesResponse>}
     */
    databaseGetFaculties(params: MethodsProps.DatabaseGetFacultiesParams): Promise<Responses.DatabaseGetFacultiesResponse>;
    /**
     * Returns list of chairs on a specified faculty.
     *
     * @param {{
     *   faculty_id: (number),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.DatabaseGetChairsResponse>}
     */
    databaseGetChairs(params: MethodsProps.DatabaseGetChairsParams): Promise<Responses.DatabaseGetChairsResponse>;
    /**
     * Returns a list of user gifts.
     *
     * @param {{
     *   user_id: (number|undefined),
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.GiftsGetResponse>}
     */
    giftsGet(params: MethodsProps.GiftsGetParams): Promise<Responses.GiftsGetResponse>;
    /**
     * Returns a list of advertising accounts.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetAccountsResponse>}
     */
    adsGetAccounts(params: MethodsProps.AdsGetAccountsParams): Promise<Responses.AdsGetAccountsResponse>;
    /**
     * Returns a list of advertising agency's clients.
     *
     * @param {{
     *   account_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetClientsResponse>}
     */
    adsGetClients(params: MethodsProps.AdsGetClientsParams): Promise<Responses.AdsGetClientsResponse>;
    /**
     * Creates clients of an advertising agency.
     *
     * @param {{
     *   account_id: (number),
     *   data: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsCreateClientsResponse>}
     */
    adsCreateClients(params: MethodsProps.AdsCreateClientsParams): Promise<Responses.AdsCreateClientsResponse>;
    /**
     * Edits clients of an advertising agency.
     *
     * @param {{
     *   account_id: (number),
     *   data: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsUpdateClientsResponse>}
     */
    adsUpdateClients(params: MethodsProps.AdsUpdateClientsParams): Promise<Responses.AdsUpdateClientsResponse>;
    /**
     * Archives clients of an advertising agency.
     *
     * @param {{
     *   account_id: (number),
     *   ids: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsDeleteClientsResponse>}
     */
    adsDeleteClients(params: MethodsProps.AdsDeleteClientsParams): Promise<Responses.AdsDeleteClientsResponse>;
    /**
     * Returns a list of campaigns in an advertising account.
     *
     * @param {{
     *   account_id: (number),
     *   client_id: (number|undefined),
     *   include_deleted: (boolean|undefined),
     *   campaign_ids: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetCampaignsResponse>}
     */
    adsGetCampaigns(params: MethodsProps.AdsGetCampaignsParams): Promise<Responses.AdsGetCampaignsResponse>;
    /**
     * Creates advertising campaigns.
     *
     * @param {{
     *   account_id: (number),
     *   data: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsCreateCampaignsResponse>}
     */
    adsCreateCampaigns(params: MethodsProps.AdsCreateCampaignsParams): Promise<Responses.AdsCreateCampaignsResponse>;
    /**
     * Edits advertising campaigns.
     *
     * @param {{
     *   account_id: (number),
     *   data: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsUpdateCampaignsResponse>}
     */
    adsUpdateCampaigns(params: MethodsProps.AdsUpdateCampaignsParams): Promise<Responses.AdsUpdateCampaignsResponse>;
    /**
     * Archives advertising campaigns.
     *
     * @param {{
     *   account_id: (number),
     *   ids: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsDeleteCampaignsResponse>}
     */
    adsDeleteCampaigns(params: MethodsProps.AdsDeleteCampaignsParams): Promise<Responses.AdsDeleteCampaignsResponse>;
    /**
     * Returns number of ads.
     *
     * @param {{
     *   account_id: (number),
     *   client_id: (number|undefined),
     *   include_deleted: (boolean|undefined),
     *   campaign_ids: (string|undefined),
     *   ad_ids: (string|undefined),
     *   limit: (number|undefined),
     *   offset: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetAdsResponse>}
     */
    adsGetAds(params: MethodsProps.AdsGetAdsParams): Promise<Responses.AdsGetAdsResponse>;
    /**
     * Returns descriptions of ad layouts.
     *
     * @param {{
     *   account_id: (number),
     *   client_id: (number|undefined),
     *   include_deleted: (boolean|undefined),
     *   campaign_ids: (string|undefined),
     *   ad_ids: (string|undefined),
     *   limit: (number|undefined),
     *   offset: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetAdsLayoutResponse>}
     */
    adsGetAdsLayout(params: MethodsProps.AdsGetAdsLayoutParams): Promise<Responses.AdsGetAdsLayoutResponse>;
    /**
     * Returns ad targeting parameters.
     *
     * @param {{
     *   account_id: (number),
     *   client_id: (number|undefined),
     *   include_deleted: (boolean|undefined),
     *   campaign_ids: (string|undefined),
     *   ad_ids: (string|undefined),
     *   limit: (number|undefined),
     *   offset: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetAdsTargetingResponse>}
     */
    adsGetAdsTargeting(params: MethodsProps.AdsGetAdsTargetingParams): Promise<Responses.AdsGetAdsTargetingResponse>;
    /**
     * Creates ads.
     *
     * @param {{
     *   account_id: (number),
     *   data: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsCreateAdsResponse>}
     */
    adsCreateAds(params: MethodsProps.AdsCreateAdsParams): Promise<Responses.AdsCreateAdsResponse>;
    /**
     * Edits ads.
     *
     * @param {{
     *   account_id: (number),
     *   data: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsUpdateAdsResponse>}
     */
    adsUpdateAds(params: MethodsProps.AdsUpdateAdsParams): Promise<Responses.AdsUpdateAdsResponse>;
    /**
     * Archives ads.
     *
     * @param {{
     *   account_id: (number),
     *   ids: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsDeleteAdsResponse>}
     */
    adsDeleteAds(params: MethodsProps.AdsDeleteAdsParams): Promise<Responses.AdsDeleteAdsResponse>;
    /**
     * Allows to check the ad link.
     *
     * @param {{
     *   account_id: (number),
     *   link_type: (string),
     *   link_url: (string),
     *   campaign_id: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsCheckLinkResponse>}
     */
    adsCheckLink(params: MethodsProps.AdsCheckLinkParams): Promise<Responses.AdsCheckLinkResponse>;
    /**
     * Returns statistics of performance indicators for ads, campaigns, clients or the whole account.
     *
     * @param {{
     *   account_id: (number),
     *   ids_type: (string),
     *   ids: (string),
     *   period: (string),
     *   date_from: (string),
     *   date_to: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetStatisticsResponse>}
     */
    adsGetStatistics(params: MethodsProps.AdsGetStatisticsParams): Promise<Responses.AdsGetStatisticsResponse>;
    /**
     * Returns demographics for ads or campaigns.
     *
     * @param {{
     *   account_id: (number),
     *   ids_type: (string),
     *   ids: (string),
     *   period: (string),
     *   date_from: (string),
     *   date_to: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetDemographicsResponse>}
     */
    adsGetDemographics(params: MethodsProps.AdsGetDemographicsParams): Promise<Responses.AdsGetDemographicsResponse>;
    /**
     * Allows to get detailed information about the ad post reach.
     *
     * @param {{
     *   account_id: (number),
     *   ads_ids: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetAdsPostsReachResponse>}
     */
    adsGetAdsPostsReach(params: MethodsProps.AdsGetAdsPostsReachParams): Promise<Responses.AdsGetAdsPostsReachResponse>;
    /**
     * Returns current budget of the advertising account.
     *
     * @param {{
     *   account_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetBudgetResponse>}
     */
    adsGetBudget(params: MethodsProps.AdsGetBudgetParams): Promise<Responses.AdsGetBudgetResponse>;
    /**
     * Returns a list of managers and supervisors of advertising account.
     *
     * @param {{
     *   account_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetOfficeUsersResponse>}
     */
    adsGetOfficeUsers(params: MethodsProps.AdsGetOfficeUsersParams): Promise<Responses.AdsGetOfficeUsersResponse>;
    /**
     * Adds managers and/or supervisors to advertising account.
     *
     * @param {{
     *   account_id: (number),
     *   data: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsAddOfficeUsersResponse>}
     */
    adsAddOfficeUsers(params: MethodsProps.AdsAddOfficeUsersParams): Promise<Responses.AdsAddOfficeUsersResponse>;
    /**
     * Removes managers and/or supervisors from advertising account.
     *
     * @param {{
     *   account_id: (number),
     *   ids: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsRemoveOfficeUsersResponse>}
     */
    adsRemoveOfficeUsers(params: MethodsProps.AdsRemoveOfficeUsersParams): Promise<Responses.AdsRemoveOfficeUsersResponse>;
    /**
     * Returns the size of targeting audience, and also recommended values for CPC and CPM.
     *
     * @param {{
     *   account_id: (number),
     *   criteria: (string|undefined),
     *   ad_id: (number|undefined),
     *   ad_format: (number|undefined),
     *   ad_platform: (string|undefined),
     *   link_url: (string),
     *   link_domain: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetTargetingStatsResponse>}
     */
    adsGetTargetingStats(params: MethodsProps.AdsGetTargetingStatsParams): Promise<Responses.AdsGetTargetingStatsResponse>;
    /**
     * Returns a set of auto-suggestions for various targeting parameters.
     *
     * @param {{
     *   section: (string),
     *   ids: (string|undefined),
     *   q: (string|undefined),
     *   country: (number|undefined),
     *   cities: (string|undefined),
     *   lang: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetSuggestionsResponse>}
     */
    adsGetSuggestions(params: MethodsProps.AdsGetSuggestionsParams): Promise<Responses.AdsGetSuggestionsResponse>;
    /**
     * Returns a list of possible ad categories.
     *
     * @param {{
     *   lang: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetCategoriesResponse>}
     */
    adsGetCategories(params: MethodsProps.AdsGetCategoriesParams): Promise<Responses.AdsGetCategoriesResponse>;
    /**
     * Returns URL to upload an ad photo to.
     *
     * @param {{
     *   ad_format: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetUploadURLResponse>}
     */
    adsGetUploadURL(params: MethodsProps.AdsGetUploadURLParams): Promise<Responses.AdsGetUploadURLResponse>;
    /**
     * Returns URL to upload an ad video to.
     *
     * @param {{
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetVideoUploadURLResponse>}
     */
    adsGetVideoUploadURL(params: MethodsProps.AdsGetVideoUploadURLParams): Promise<Responses.AdsGetVideoUploadURLResponse>;
    /**
     * Returns information about current state of a counter ??? number of remaining runs of methods and time to the next counter nulling in seconds.
     *
     * @param {{
     *   account_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetFloodStatsResponse>}
     */
    adsGetFloodStats(params: MethodsProps.AdsGetFloodStatsParams): Promise<Responses.AdsGetFloodStatsResponse>;
    /**
     * Returns a reason of ad rejection for pre-moderation.
     *
     * @param {{
     *   account_id: (number),
     *   ad_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetRejectionReasonResponse>}
     */
    adsGetRejectionReason(params: MethodsProps.AdsGetRejectionReasonParams): Promise<Responses.AdsGetRejectionReasonResponse>;
    /**
     * Creates a group to re-target ads for users who visited advertiser's site (viewed information about the product, registered, etc.).
     *
     * @param {{
     *   account_id: (number),
     *   client_id: (number|undefined),
     *   name: (string),
     *   domain: (string|undefined),
     *   lifetime: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsCreateTargetGroupResponse>}
     */
    adsCreateTargetGroup(params: MethodsProps.AdsCreateTargetGroupParams): Promise<Responses.AdsCreateTargetGroupResponse>;
    /**
     * Edits a retarget group.
     *
     * @param {{
     *   account_id: (number),
     *   client_id: (number|undefined),
     *   target_group_id: (number),
     *   name: (string),
     *   domain: (string|undefined),
     *   lifetime: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    adsUpdateTargetGroup(params: MethodsProps.AdsUpdateTargetGroupParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a retarget group.
     *
     * @param {{
     *   account_id: (number),
     *   client_id: (number|undefined),
     *   target_group_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    adsDeleteTargetGroup(params: MethodsProps.AdsDeleteTargetGroupParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of target groups.
     *
     * @param {{
     *   account_id: (number),
     *   client_id: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsGetTargetGroupsResponse>}
     */
    adsGetTargetGroups(params: MethodsProps.AdsGetTargetGroupsParams): Promise<Responses.AdsGetTargetGroupsResponse>;
    /**
     * Imports a list of advertiser's contacts to count VK registered users against the target group.
     *
     * @param {{
     *   account_id: (number),
     *   client_id: (number|undefined),
     *   target_group_id: (number),
     *   contacts: (string),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.AdsImportTargetContactsResponse>}
     */
    adsImportTargetContacts(params: MethodsProps.AdsImportTargetContactsParams): Promise<Responses.AdsImportTargetContactsResponse>;
    /**
     * Checks the user authentication in 'IFrame' and 'Flash' apps using the 'access_token' parameter.
     *
     * @param {{
     *   token: (string|undefined),
     *   ip: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.SecureCheckTokenResponse>}
     */
    secureCheckToken(params: MethodsProps.SecureCheckTokenParams): Promise<Responses.SecureCheckTokenResponse>;
    /**
     * Returns items list for a community.
     *
     * @param {{
     *   owner_id: (number),
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MarketGetResponse>}
     */
    marketGet(params: MethodsProps.MarketGetParams): Promise<Responses.MarketGetResponse>;
    /**
     * Returns information about market items by their ids.
     *
     * @param {{
     *   item_ids: (string[]),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MarketGetByIdResponse>}
     */
    marketGetById(params: MethodsProps.MarketGetByIdParams): Promise<Responses.MarketGetByIdResponse>;
    /**
     * Searches market items in a community's catalog
     *
     * @param {{
     *   owner_id: (number),
     *   q: (string|undefined),
     *   price_from: (number|undefined),
     *   price_to: (number|undefined),
     *   tags: (number[]|undefined),
     *   rev: (number|undefined),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   extended: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MarketSearchResponse>}
     */
    marketSearch(params: MethodsProps.MarketSearchParams): Promise<Responses.MarketSearchResponse>;
    /**
     * Returns community's collections list.
     *
     * @param {{
     *   owner_id: (number),
     *   offset: (number|undefined),
     *   count: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MarketGetAlbumsResponse>}
     */
    marketGetAlbums(params: MethodsProps.MarketGetAlbumsParams): Promise<Responses.MarketGetAlbumsResponse>;
    /**
     * Returns items album's data
     *
     * @param {{
     *   owner_id: (number),
     *   album_ids: (number[]),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MarketGetAlbumByIdResponse>}
     */
    marketGetAlbumById(params: MethodsProps.MarketGetAlbumByIdParams): Promise<Responses.MarketGetAlbumByIdResponse>;
    /**
     * Creates a new comment for an item.
     *
     * @param {{
     *   owner_id: (number),
     *   item_id: (number),
     *   message: (string|undefined),
     *   attachments: (string[]|undefined),
     *   from_group: (boolean|undefined),
     *   reply_to_comment: (number|undefined),
     *   sticker_id: (number|undefined),
     *   guid: (string|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MarketCreateCommentResponse>}
     */
    marketCreateComment(params: MethodsProps.MarketCreateCommentParams): Promise<Responses.MarketCreateCommentResponse>;
    /**
     * Returns comments list for an item.
     *
     * @param {{
     *   owner_id: (number),
     *   item_id: (number),
     *   need_likes: (boolean|undefined),
     *   start_comment_id: (number|undefined),
     *   count: (number|undefined),
     *   sort: (string|undefined),
     *   extended: (boolean|undefined),
     *   fields: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MarketGetCommentsResponse>}
     */
    marketGetComments(params: MethodsProps.MarketGetCommentsParams): Promise<Responses.MarketGetCommentsResponse>;
    /**
     * Deletes an item's comment
     *
     * @param {{
     *   owner_id: (number),
     *   comment_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MarketDeleteCommentResponse>}
     */
    marketDeleteComment(params: MethodsProps.MarketDeleteCommentParams): Promise<Responses.MarketDeleteCommentResponse>;
    /**
     * Restores a recently deleted comment
     *
     * @param {{
     *   owner_id: (number),
     *   comment_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MarketRestoreCommentResponse>}
     */
    marketRestoreComment(params: MethodsProps.MarketRestoreCommentParams): Promise<Responses.MarketRestoreCommentResponse>;
    /**
     * Chages item comment's text
     *
     * @param {{
     *   owner_id: (number),
     *   comment_id: (number),
     *   message: (string|undefined),
     *   attachments: (string[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    marketEditComment(params: MethodsProps.MarketEditCommentParams): Promise<Responses.OkResponse>;
    /**
     * Sends a complaint to the item's comment.
     *
     * @param {{
     *   owner_id: (number),
     *   comment_id: (number),
     *   reason: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    marketReportComment(params: MethodsProps.MarketReportCommentParams): Promise<Responses.OkResponse>;
    /**
     * Returns a list of market categories.
     *
     * @param {{
     *   count: (number|undefined),
     *   offset: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MarketGetCategoriesResponse>}
     */
    marketGetCategories(params: MethodsProps.MarketGetCategoriesParams): Promise<Responses.MarketGetCategoriesResponse>;
    /**
     * Sends a complaint to the item.
     *
     * @param {{
     *   owner_id: (number),
     *   item_id: (number),
     *   reason: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    marketReport(params: MethodsProps.MarketReportParams): Promise<Responses.OkResponse>;
    /**
     * Ads a new item to the market.
     *
     * @param {{
     *   owner_id: (number),
     *   name: (string),
     *   description: (string),
     *   category_id: (number),
     *   price: (number),
     *   deleted: (boolean|undefined),
     *   main_photo_id: (number),
     *   photo_ids: (number[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MarketAddResponse>}
     */
    marketAdd(params: MethodsProps.MarketAddParams): Promise<Responses.MarketAddResponse>;
    /**
     * Edits an item.
     *
     * @param {{
     *   owner_id: (number),
     *   item_id: (number),
     *   name: (string),
     *   description: (string),
     *   category_id: (number),
     *   price: (number),
     *   deleted: (boolean|undefined),
     *   main_photo_id: (number),
     *   photo_ids: (number[]|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    marketEdit(params: MethodsProps.MarketEditParams): Promise<Responses.OkResponse>;
    /**
     * Deletes an item.
     *
     * @param {{
     *   owner_id: (number),
     *   item_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    marketDelete(params: MethodsProps.MarketDeleteParams): Promise<Responses.OkResponse>;
    /**
     * Restores recently deleted item
     *
     * @param {{
     *   owner_id: (number),
     *   item_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    marketRestore(params: MethodsProps.MarketRestoreParams): Promise<Responses.OkResponse>;
    /**
     * Changes item place in a collection.
     *
     * @param {{
     *   owner_id: (number),
     *   album_id: (number|undefined),
     *   item_id: (number),
     *   before: (number|undefined),
     *   after: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    marketReorderItems(params: MethodsProps.MarketReorderItemsParams): Promise<Responses.OkResponse>;
    /**
     * Reorders the collections list.
     *
     * @param {{
     *   owner_id: (number),
     *   album_id: (number),
     *   before: (number|undefined),
     *   after: (number|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    marketReorderAlbums(params: MethodsProps.MarketReorderAlbumsParams): Promise<Responses.OkResponse>;
    /**
     * Creates new collection of items
     *
     * @param {{
     *   owner_id: (number),
     *   title: (string),
     *   photo_id: (number|undefined),
     *   main_album: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.MarketAddAlbumResponse>}
     */
    marketAddAlbum(params: MethodsProps.MarketAddAlbumParams): Promise<Responses.MarketAddAlbumResponse>;
    /**
     * Edits a collection of items
     *
     * @param {{
     *   owner_id: (number),
     *   album_id: (number),
     *   title: (string),
     *   photo_id: (number|undefined),
     *   main_album: (boolean|undefined),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    marketEditAlbum(params: MethodsProps.MarketEditAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Deletes a collection of items.
     *
     * @param {{
     *   owner_id: (number),
     *   album_id: (number),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    marketDeleteAlbum(params: MethodsProps.MarketDeleteAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Removes an item from one or multiple collections.
     *
     * @param {{
     *   owner_id: (number),
     *   item_id: (number),
     *   album_ids: (number[]),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    marketRemoveFromAlbum(params: MethodsProps.MarketRemoveFromAlbumParams): Promise<Responses.OkResponse>;
    /**
     * Adds an item to one or multiple collections.
     *
     * @param {{
     *   owner_id: (number),
     *   item_id: (number),
     *   album_ids: (number[]),
     *   access_token: (string|undefined)
     * }} params
     *
     * @returns {Promise<Responses.OkResponse>}
     */
    marketAddToAlbum(params: MethodsProps.MarketAddToAlbumParams): Promise<Responses.OkResponse>;
}
