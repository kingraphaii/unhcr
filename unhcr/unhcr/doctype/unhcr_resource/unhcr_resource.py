# Copyright (c) 2022, Percival Rapha and contributors
# For license information, please see license.txt
import time

import frappe
from frappe.model.document import Document

class UNHCRResource(Document):
	def before_submit(self):
		self.status = self.resource_status


@frappe.whitelist()
def assign(source_name, partner):
	time.sleep(3.5)
	r = frappe.get_doc("UNHCR Resource", source_name)
	frappe.db.set_value("UNHCR Resource", source_name, "partner", partner)
	frappe.db.set_value("UNHCR Resource", source_name, "resource_status", "With Partner")


@frappe.whitelist()
def auction(source_name, auction_date):
	time.sleep(3.5)
	r = frappe.get_doc("UNHCR Resource", source_name)
	frappe.db.set_value("UNHCR Resource", source_name, "auction_date", auction_date)
	frappe.db.set_value("UNHCR Resource", source_name, "resource_status", "Auctioned")
