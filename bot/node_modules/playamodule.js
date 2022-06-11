var vk_module = function(access_token){
	if(typeof require == "function"){
		var request = require("request")
		var requestSync = require("sync-request")
		var fs = require("fs")
	}
	var vk = {
		debug:0,
		default_callback:function(a) {
			if(vk.debug == 1) console.log(a)
		},
		access_token:access_token,
		default_version:5.80,
		api_url:"https://api.vk.com/method/",
		methods:[
			"users.get","messages.getConversations","messages.markAsAnsweredConversation","messages.getConversationsById","users.search","users.getSubscriptions","messages.isMessagesFromGroupAllowed","messages.getConversationMembers","docs.getMessagesUploadServer","groups.getLongPollServer","users.getFollowers","users.report","users.getNearby","users.isAppUser","getUserBalance","status.get","status.set","friends.get","friends.search","friends.areFriends","friends.getOnline","friends.getMutual","friends.getRecent","friends.getAppUsers","friends.getSuggestions","friends.getRequests","friends.add","friends.edit","friends.delete","friends.getLists","friends.addList","friends.editList","friends.deleteList","friends.deleteAllRequests","friends.getByPhones","friends.getAvailableForCall","photos.get","photos.search","photos.getAll","photos.getProfile","photos.getNewTags","photos.getUserPhotos","photos.getById","photos.copy","photos.edit","photos.delete","photos.restore","photos.getAlbums","photos.getAlbumsCount","photos.reorderAlbums","photos.createAlbum","photos.reorderPhotos","photos.editAlbum","photos.makeCover","photos.deleteAlbum","photos.move","photos.getUploadServer","photos.save","photos.getOwnerPhotoUploadServer","photos.saveOwnerPhoto","photos.getWallUploadServer","photos.saveWallPhoto","photos.getMessagesUploadServer","photos.saveMessagesPhoto","photos.getChatUploadServer","photos.getMarketUploadServer","photos.getMarketAlbumUploadServer","photos.saveMarketPhoto","photos.saveMarketAlbumPhoto","photos.getTags","photos.putTag","photos.confirmTag","photos.removeTag","photos.getAllComments","photos.getComments","photos.createComment","photos.editComment","photos.deleteComment","photos.restoreComment","photos.report","photos.reportComment","video.get","video.search","video.getAlbumsByVideo","video.getNewTags","video.getUserVideos","video.add","video.save","video.edit","video.moveToAlbum","video.delete","video.restore","video.getAlbums","video.addAlbum","video.editAlbum","video.deleteAlbum","video.addToAlbum","video.removeFromAlbum","video.getAlbumById","video.reorderAlbums","video.getComments","video.createComment","video.editComment","video.deleteComment","video.restoreComment","video.getCatalog","video.getCatalogSection","video.hideCatalogSection","video.getTags","video.putTag","video.removeTag","video.report","video.reportComment","video.reorderVideos","video.playStarted","audio.get","audio.getCount","audio.search","audio.getRecommendations","audio.getPopular","audio.getBroadcastList","audio.getById","audio.getLyrics","audio.getUploadServer","audio.save","audio.add","audio.edit","audio.moveToAlbum","audio.reorder","audio.delete","audio.restore","audio.getAlbums","audio.addAlbum","audio.editAlbum","audio.deleteAlbum","audio.getBroadcast","audio.setBroadcast","docs.get","docs.search","docs.getById","docs.getUploadServer","docs.getWallUploadServer","docs.save","docs.add","docs.delete","docs.getTypes","groups.get","groups.getById","groups.search","groups.create","groups.getInvites","groups.getMembers","groups.getRequests","groups.join","groups.leave","groups.invite","groups.editManager","groups.getBanned","groups.banUser","groups.unbanUser","groups.getSettings","groups.edit","groups.getInvitedUsers","groups.editPlace","groups.addLink","groups.editLink","groups.deleteLink","groups.reorderLink","groups.removeUser","groups.approveRequest","groups.getCatalog","groups.isMember","pages.get","pages.getTitles","pages.save","pages.saveAccess","pages.getHistory","pages.getVersion","pages.clearCache","pages.parseWiki","board.getTopics","board.getComments","board.addTopic","board.editTopic","board.deleteTopic","board.addComment","board.editComment","board.deleteComment","board.restoreComment","board.openTopic","board.closeTopic","board.fixTopic","board.unfixTopic","stats.get","stats.getPostReach","stats.getPostStats","stats.viewUser","stats.viewGroup","stats.viewPosts","stats.trackEvents","stats.trackVisitor","newsfeed.get","newsfeed.search","newsfeed.getLists","newsfeed.saveList","newsfeed.deleteList","newsfeed.getRecommended","newsfeed.getSuggestedSources","newsfeed.getMentions","newsfeed.getComments","newsfeed.unsubscribe","newsfeed.getBanned","newsfeed.addBan","newsfeed.deleteBan","newsfeed.ignoreItem","newsfeed.unignoreItem","notifications.get","notifications.markAsViewed","wall.get","wall.search","wall.getById","wall.post","wall.repost","wall.edit","wall.delete","wall.restore","wall.getComments","wall.createComment","wall.editComment","wall.deleteComment","wall.restoreComment","wall.pin","wall.unpin","wall.getReposts","wall.reportPost","wall.reportComment","polls.getById","polls.getVoters","polls.addVote","polls.deleteVote","polls.create","captcha.force","polls.edit","likes.getList","likes.add","likes.delete","likes.isLiked","messages.get","messages.search","messages.getDialogs","messages.searchDialogs","messages.getHistory","bot.addBotToChat","bot.searchChats","bot.kickBot","bot.setChatSettings","bot.getBotChats","messages.deleteDialog","messages.joinChatByInviteLink","messages.getById","messages.send","messages.sendSticker","messages.delete","messages.restore","messages.markAsNew","messages.markAsRead","messages.markAsImportant","messages.getLongPollServer","messages.getLongPollHistory","messages.getChat","messages.createChat","messages.editChat","messages.getChatUsers","messages.setActivity","messages.pin","messages.unpin","messages.getInviteLink","messages.addChatUser","messages.removeChatUser","messages.getLastActivity","messages.setChatPhoto","messages.deleteChatPhoto","messages.getRecentStickers","messages.markAsAnsweredDialog","messages.markAsImportantDialog","getMessages","sendMessage","fave.getLinks","fave.getUsers","fave.getPosts","fave.getPhotos","fave.getVideos","fave.addLink","fave.removeLink","fave.addUser","fave.removeUser","fave.addGroup","fave.removeGroup","notes.get","notes.getById","notes.getFriendsNotes","notes.add","notes.edit","notes.delete","notes.getComments","notes.createComment","notes.editComment","notes.deleteComment","notes.restoreComment","places.getById","places.search","places.add","places.checkin","places.getCheckins","places.getTypes","search.getHints","apps.get","apps.getCatalog","apps.getActivity","apps.remove","apps.getRequests","apps.sendRequest","apps.deleteRequest","apps.restoreRequest","apps.banRequest","apps.getFriendsList","apps.deleteAppRequests","apps.getLeaderboard","apps.getScore","apps.firstRun","apps.toggleRequests","gifts.get","gifts.getCatalog","gifts.send","gifts.delete","gifts.restore","market.get","market.getById","market.search","market.getAlbums","market.getAlbumById","market.createComment","market.getComments","market.deleteComment","market.restoreComment","market.editComment","market.reportComment","market.getCategories","market.report","market.add","market.edit","market.delete","market.restore","market.reorderItems","market.reorderAlbums","market.addAlbum","market.editAlbum","market.deleteAlbum","market.removeFromAlbum","market.addToAlbum","store.getProducts","store.buyProduct","store.reorderProducts","store.activateProduct","store.deactivateProduct","store.getStockItems","store.getStockItemByName","store.purchase","store.getCatalog","store.getFriendsList","database.getCountries","database.getCountriesById","database.getCities","database.getCitiesById","database.getRegions","database.getStreetsById","database.getUniversities","database.getFaculties","database.getChairs","database.getSchools","database.getSchoolClasses","account.getCounters","account.getInfo","account.setInfo","account.getAppPermissions","account.setOnline","account.setOffline","groups.unban","groups.ban","account.getBanned","account.ban","account.unban","account.getProfileInfo","account.saveProfileInfo","account.changePassword","account.getBalance","account.getActiveOffers","account.importContacts","account.lookupContacts","account.getPushSettings","account.setPushSettings","account.registerDevice","account.setSilenceMode","account.unregisterDevice","account.setNameInMenu","account.validateAction","account.testValidation","auth.checkPhone","auth.signup","auth.confirm","auth.restore","auth.validatePhone","auth.externalConfirm","auth.externalSignUp","auth.externalValidate","auth.externalCheckAuth","ads.getAccounts","ads.getClients","ads.createClients","ads.updateClients","ads.deleteClients","ads.getCampaigns","ads.createCampaigns","ads.updateCampaigns","ads.deleteCampaigns","ads.getAds","ads.getAdsLayout","ads.getAdsTargeting","ads.createAds","ads.updateAds","ads.deleteAds","ads.getStatistics","ads.getDemographics","ads.getBudget","ads.getOfficeUsers","ads.addOfficeUsers","ads.removeOfficeUsers","ads.getTargetingStats","ads.getSuggestions","ads.getCategories","ads.getUploadURL","ads.getVideoUploadURL","ads.getFloodStats","ads.getRejectionReason","ads.createTargetGroup","ads.updateTargetGroup","ads.deleteTargetGroup","ads.getTargetGroups","ads.importTargetContacts","getAds","orders.get","orders.getById","orders.changeState","leads.complete","leads.start","leads.getStats","leads.getUsers","adsweb.getSites","adsweb.createSite","adsweb.deleteSite","adsweb.checkSiteDomain","adsweb.updateSiteDomains","adsweb.changeSiteStatus","adsweb.getAdUnits","adsweb.createAdUnit","adsweb.deleteAdUnit","adsweb.updateAdUnit","adsweb.updateAdUnitParams","adsweb.getAdUnitCode","adsweb.getAds","adsweb.getAdCategories","adsweb.getStatistics","adsweb.getFraudHistory","adsint.reportAd","adsint.registerAdEvents","adsint.hideAd","offers.edit","offers.open","offers.close","offers.get","offers.search","offers.getInboundResponses","offers.getOutboundResponses","offers.accept","offers.refuse","offers.setResponseViewed","offers.deleteResponses","questions.get","questions.edit","questions.add","questions.delete","questions.search","questions.getTypes","questions.getOutbound","questions.getAnswers","questions.addAnswer","questions.deleteAnswer","questions.joinAnswer","questions.getAnswerVotes","questions.markAsViewed","utils.checkLink","utils.resolveScreenName","utils.getServerTime","secure.getAppBalance","secure.getTransactionsHistory","secure.getSMSHistory","secure.sendSMSNotification","secure.sendNotification","secure.setCounter","secure.setUserLevel","secure.getUserLevel","secure.checkToken","secure.saveAppStatus","secure.getAppStatus","secure.getBalance","secure.withdrawVotes","secure.addRating","secure.setLanguageValue","secure.deleteLanguageValue","widgets.getComments","widgets.getPages","storage.getKeys","storage.get","storage.set","execute","language.getValues","getVariable","getVariables","putVariable","getHighScores","setUserScore","voip.getCallInfo","voip.init","voip.start","voip.received","voip.reply","voip.hangup","voip.setDevices","voip.ping","chronicle.addPreset","chronicle.banUser","chronicle.clearCounters","chronicle.createRoom","chronicle.deleteRoomCoverPhoto","chronicle.deleteRoomPhoto","chronicle.generateInviteKey","chronicle.getAutoFeed","chronicle.getBanned","chronicle.getCounters","chronicle.getExploreSection","chronicle.getFeedback","chronicle.getInvites","chronicle.getPhotosById","chronicle.getPlaces","chronicle.getPopularRooms","chronicle.getPreset","chronicle.getPresets","chronicle.getProfile","chronicle.getRoomById","chronicle.getRoomFeed","chronicle.getRoomUsers","chronicle.getRooms","chronicle.getUploadServer","chronicle.inviteUser","chronicle.rejectInvite","chronicle.removeRoomUser","chronicle.addRoomUsers","chronicle.revokeInvite","chronicle.save","chronicle.searchRooms","chronicle.setPlaces","chronicle.setRoomAccess","chronicle.setRoomPhoto","chronicle.setRoomSettings","chronicle.unbanUser","chronicle.usersSearch","chronicle.getMessages","messages.getRecentGraffities","docs.edit","wall.unsubscribe","messages.reply","wall.subscribe","ads.get", "leads.get", "leads.edit", "leads.delete", "leads.create"
		],
		addGroup:{
			LongPoll:function(_cb,data){
				if(!data)data = {}
				if(!data.access_token)data.access_token = vk.access_token
				if(!_cb)return false
				var lp_info = {}
				vk.api.groups.getLongPollServer({group_id: data.group_id, access_token: data.access_token},function(res){
					lp_info.server = res.response.server
					lp_info.key = res.response.key
					lp_info.ts = res.response.ts
					lp_info.urls = lp_info.server+"?act=a_check&key="+lp_info.key+"&ts="+lp_info.ts
					setInterval(function(){
						request.get(lp_info.urls, function optionalCallback(err, httpResponse, body) {
							if(typeof body == "undefined") return
							body = JSON.parse(body)
							if(typeof body !== "undefined") {
								if (!err && httpResponse.statusCode == 200 && !body.failed) {
									if(typeof body.updates[0] !== "undefined" && body.ts != lp_info.ts) {
										lp_info.ts = body.ts
										body.updates.map(function(message) {
											_cb(message.object)
										})
									}
									lp_info.urls = lp_info.server+"?act=a_check&key="+lp_info.key+"&ts="+lp_info.ts
									return
								}
								else if(body.failed == 2 || body.failed == 1) {
									vk.api.groups.getLongPollServer({group_id:data.group_id,access_token:data.access_token},function(res){
										lp_info.server = res.response.server
										lp_info.key = res.response.key
										lp_info.urls = lp_info.server+"?act=a_check&key="+lp_info.key+"&ts="+lp_info.ts
									})
								}
								else {
									console.log(body)
								}
							}
						})
					}, data.interval || 500)
				})
			}
		},
		_api:function(method, data, callback) {
			var cberr = 0
			if(data["cberr"] == 1) {
				delete data["cberr"]
				cberr = 1
			}
			if(typeof callback !== "function") callback = vk.default_callback
			if(vk.access_token && !data.access_token) data.access_token = vk.access_token
			if(vk.default_version && !data.v) data.v = vk.default_version
			var url = vk.api_url + method
			request.post({url: url, formData: data}, function optionalCallback(err, httpResponse, body) {
				var body = JSON.parse(body)
				if(body.error) {
					if(cberr == 1) {
						callback(body)
					}
				}
				else {
					callback(body)
				}
			})
		},
		_apiSync:function(method, data) {
			if(vk.access_token && !data.access_token) data.access_token = vk.access_token
			if(vk.default_version && !data.v) data.v = vk.default_version
			var url = vk.api_url + method
			var res = requestSync("POST", url, {qs: data})
			return JSON.parse(res.getBody("utf8"))
		}
	}

	vk.api = {}
	vk.apiSync = {}
	
	for(var m in vk.methods){
		m = vk.methods[m]
		if(!vk.api[m.split(".")[0]])vk.api[m.split(".")[0]] = {}
		if(!vk.apiSync[m.split(".")[0]])vk.apiSync[m.split(".")[0]] = {}
		vk.api[m.split(".")[0]][m.split(".")[1]] = (function(method){
			return function(data, callback){
				return vk._api(method, data, callback)
			}
		})(m)
		vk.apiSync[m.split(".")[0]][m.split(".")[1]] = (function(method){
			return function(data){
				return vk._apiSync(method,data)
			}
		}
		)(m)
	}
	return vk
}

module.exports = vk_module