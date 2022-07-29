frappe.treeview_settings["UNHCR Resource Type"] = {
	title: "Resource Categories",
	ignore_fields:["parent_unhcr_resource_type"],
	root_label: "All Resource Types",
	menu_items: [
        {
            label: 'New Resource',
            action: function() { frappe.new_doc('UNHCR Resource', true) },
            condition: "frappe.boot.user.can_create.indexOf('UNHCR Resource') !== -1"
        }
    ],
	extend_toolbar: true,
}