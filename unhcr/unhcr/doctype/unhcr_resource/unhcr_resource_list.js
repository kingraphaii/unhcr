frappe.listview_settings['UNHCR Resource'] = {
	add_fields: ["resource_title", "resource_type", "department", "resource_status"],
	get_indicator: (doc) => {
		if(doc.resource_status == "Auctioned"){
            return [doc.resource_status, "red", "resource_status,=,Auctioned"];
        }else if(doc.resource_status == "With Partner"){
            return [doc.resource_status, "yellow", "resource_status,=,With Partner"];
        }else if(doc.resource_status == ""){
            return [doc.resource_status, "green", "resource_status,=,"];
        }
	}
};