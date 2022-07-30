import {useRouter} from 'next/router'

export const DashboardURL = [
	{name: 'dashboard', href: `/dashboard`, iconName: 'speedometer2'},
	{name: 'projects', href: `/dashboard/projects`, iconName: 'briefcase'},
	{name: 'tasks', href: `/dashboard/tasks`, iconName: 'clipboard2-check'},
	{name: 'learn', href: `/dashboard/learn`, iconName: 'pen'},
	{name: 'community', href: `/dashboard/community`, iconName: 'people'},
	{name: 'membership', href: `/membership`, iconName: 'person-square'},
	{name: 'referrals', href: `/dashboard/referrals`, iconName: 'diagram-3'},
	{name: 'capital', href: `/dashboard/capital`, iconName: 'currency-exchange'},
	{name: 'logout', href: `/dashboard/logout`, iconName: 'door-open-fill text-danger'},
]
