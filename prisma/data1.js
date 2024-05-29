const adminRoles = [
	{
		role: 'superAdmin',
		hierarchyLevel: 0,
		permissions: '',
	},
	{
		role: 'phdCellIncharge',
		hierarchyLevel: 1,
		permissions: '',
	},
	{
		role: 'manager',
		hierarchyLevel: 2,
		permissions: '',
	},
	{
		role: 'assistantManager',
		hierarchyLevel: 3,
		permissions: '',
	},
	{
		role: 'executive',
		hierarchyLevel: 4,
		permissions: '',
	},
	{
		role: 'auditor',
		hierarchyLevel: 5,
		permissions: '',
	},
	{
		role: 'mts',
		hierarchyLevel: 6,
		permissions: '',
	},
];

const roles = [
	{
		role: 'Head',
		hierarchyLevel: 0,
		permissions: '',
		auditTrail: '',
		validStatuses: '',
	},
	{
		role: 'falsedal',
		hierarchyLevel: 1,
		permissions: '',
		auditTrail: '',
		validStatuses: '',
	},
	{
		role: 'Student',
		hierarchyLevel: 2,
		permissions: '',
		auditTrail: '',
		validStatuses: '',
	},
];

module.exports = {
    adminRoles,
    roles
};