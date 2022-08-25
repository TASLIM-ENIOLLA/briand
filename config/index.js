const dev = process.env.NODE_ENV !== 'production'

export const server = {
	frontend: {
		url: (
			(dev)
			? 'http://localhost:3000/'
			: 'https://briand.vercel.app/'
		)
	},
	backend: {
		url: (
			(dev)
			// ? 'http://192.168.137.1:80/praise-project/'
			? 'http://localhost:80/praise-project/'
			: 'https://briand-project.000webhostapp.com/'
		)
	}
}

export const api_routes = {
	login: `${server.backend.url}php/processes/Login.php`,
	register: `${server.backend.url}php/processes/Register.php`,
	service_plans: `${server.backend.url}php/processes/ServicePlans.php`,
	business_categories: `${server.backend.url}php/processes/GetBusinessCategories.php`,
	user_data: `${server.backend.url}php/processes/GetUserData.php`,
	referree_data: `${server.backend.url}php/processes/GetReferreeData.php`,
	dashboard: {
		referrals: {
			create_referral_link: `${server.backend.url}php/processes/dashboard/referrals/CreateReferralLink.php`,
			get_user_referral_data: `${server.backend.url}php/processes/dashboard/referrals/GetUserReferralLink.php`,
			get_user_referree_data: `${server.backend.url}php/processes/dashboard/referrals/GetUserReferreeData.php`,
			remove_user_referral_id: `${server.backend.url}php/processes/dashboard/referrals/RemoveUserReferralID.php`,
		},
		learn: {
			get_videos: `${server.backend.url}php/processes/dashboard/learn/GetVideos.php`,
		}
	},
	admin: {
		overview_data: `${server.backend.url}php/processes/admin/Overview.php`,
		users: {
			all_users: `${server.backend.url}php/processes/admin/users/AllUsers.php`
		},
		business_category: {
			all_categories: `${server.backend.url}php/processes/admin/business_category/AllCategories.php`,
			delete_categories: `${server.backend.url}php/processes/admin/business_category/DeleteCategories.php`,
			add_new_category: `${server.backend.url}php/processes/admin/business_category/AddNewBusinessCategory.php`,
		},
		plans: {
			all_plans: `${server.backend.url}php/processes/admin/plans/AllPlans.php`
		},
		referrals: {
			active_referrals: `${server.backend.url}php/processes/admin/referrals/ActiveReferrals.php`
		},
		video_upload: {
			all: `${server.backend.url}php/processes/admin/video_upload/AllUploads.php`,
			new: `${server.backend.url}php/processes/admin/video_upload/CreateNewUpload.php`,
		}
	}
}

export const cookie_name = 'PRAISE_PROJECT'
