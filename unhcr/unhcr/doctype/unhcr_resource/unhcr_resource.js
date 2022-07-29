// Copyright (c) 2022, Percival Rapha and contributors
// For license information, please see license.txt

frappe.ui.form.on('UNHCR Resource', {
	refresh: function(frm){

		if (frm.doc.docstatus == 1){
			if(frm.doc.resource_status != "Auctioned"){
				frm.add_custom_button(__("Set Auctioned"), function(){
					var dialog = new frappe.ui.Dialog({
						title: __("Set Resource as Auctioned"),
						fields: [
							{
								fieldname: 'Resource',
								fieldtype: 'Data',
								label: 'Resource',
								read_only: 1,
								reqd: 0,
								default: frm.doc.resource_title,
							},
							{
								fieldname: 'auction_date',
								fieldtype: 'Date',
								label: 'Date Auctioned',
								read_only: 0,
								reqd: 1,
							}
						],
						primary_action_label: 'Confirm',
						primary_action(args) {
							if (!args) return;
							dialog.hide();
							
							return frappe.call({
								method: "unhcr.unhcr.doctype.unhcr_resource.unhcr_resource.auction",
								freeze_message: __("Setting reosurce as auctioned ..."),
								args: {
									"source_name": frm.doc.name,
									"auction_date": args.auction_date
								},
								freeze: true,
								callback: function(r) {
									if (!r.exc) {
										frm.reload_doc();
									}
								}
							})
						}
					});
					
					dialog.wrapper.find('.grid-heading-row .grid-row-check').click();
					dialog.show();
				});
			}

			if(frm.doc.resource_status != "With Partner"){
				frm.add_custom_button(__("Assign to Partner"), function(){
					var dialog = new frappe.ui.Dialog({
						title: __("Assign to Partner"),
						fields: [
							{
								fieldname: 'Resource',
								fieldtype: 'Data',
								label: 'Resource',
								read_only: 1,
								reqd: 0,
								default: frm.doc.resource_title,
							},
							{
								fieldname: 'partner',
								fieldtype: 'Link',
								label: 'Select Partner',
								options: "UNHCR Partner",
								read_only: 0,
								reqd: 1,
							}
						],
						primary_action_label: 'Confirm',
						primary_action(args) {
							if (!args) return;
							dialog.hide();
							
							return frappe.call({
								method: "unhcr.unhcr.doctype.unhcr_resource.unhcr_resource.assign",
								freeze_message: __("Assigning to partner ..."),
								args: {
									"source_name": frm.doc.name,
									"partner": args.partner
								},
								freeze: true,
								callback: function(r) {
									if (!r.exc) {
										frm.reload_doc()
									}
								}
							})
						}
					});
					
					dialog.wrapper.find('.grid-heading-row .grid-row-check').click();
					dialog.show();
				});
			}
		}
	},
	setup: function(frm) {
		frm.set_query("resource_type", function() {
			return {
				"filters": {
					"is_group": 0,
				}
			};
		});
	},
});
