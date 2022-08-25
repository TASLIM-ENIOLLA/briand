import {useRouter} from 'next/router'

export const URL = {
	dashboard: [
		{name: 'dashboard', href: `/dashboard`, iconName: 'speedometer2'},
		// {name: 'projects', href: `/dashboard/projects`, iconName: 'briefcase'},
		// {name: 'tasks', href: `/dashboard/tasks`, iconName: 'clipboard2-check'},
		{name: 'learn', href: `/dashboard/learn`, iconName: 'camera-video'},
		// {name: 'community', href: `/dashboard/community`, iconName: 'people'},
		// {name: 'membership', href: `/dashboard/membership`, iconName: 'person-square'},
		{name: 'referrals', href: `/dashboard/referrals`, iconName: 'diagram-3'},
		{name: 'capital', href: `/dashboard/capital`, iconName: 'currency-exchange'},
		{name: 'logout', href: `/dashboard/logout`, iconName: 'door-open-fill text-danger'},
	],
	admin: [
		{name: 'dashboard', href: `/admin`, iconName: 'speedometer2'},
		{name: 'users', href: `/admin/users`, iconName: 'people'},
		{name: 'business categories', href: `/admin/business-categories`, iconName: 'distribute-vertical'},
		{name: 'plans', href: `/admin/plans`, iconName: 'bullseye'},
		{name: 'referrals', href: `/admin/referrals`, iconName: 'diagram-3'},
		{name: 'video uploads', href: `/admin/video-uploads`, iconName: 'camera-video'},
	]
}
