# Copyright (c) 2022, Percival Rapha and contributors
# For license information, please see license.txt

import frappe
from frappe.utils.nestedset import NestedSet

class UNHCRResourceType(NestedSet):
	nsm_parent_field = "parent_unhcr_resource_type"


@frappe.whitelist()
def get_children(parent=None, parent_unhcr_resource_type=None,is_root=False):
	return frappe.get_all(
		"UNHCR Resource Type", 
		fields=[
			"name as value", 
			"is_group as expandable"
			], 
			filters={
				# "parent_unhcr_resource_type": parent,
			}
		)

@frappe.whitelist()
def add_node():
	from frappe.desk.treeview import make_tree_args
	args = frappe.form_dict
	args = make_tree_args(**args)
	frappe.get_doc(args).insert()