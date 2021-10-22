import _ from 'lodash';

export const API_ENDPOINT = "https://pod2.lms.getvymo.com/avengers";
export const CONFIG_API_ENDPOINT = API_ENDPOINT + "/config";
export const DRAWER_WIDTH = 240;

export const CLIENTS = [
    {code: "absli", name: "ABSLI"},
    {code: "hdfc", name: "HDFC"},
    {code: "hdfcassets", name: "HDFC Assets"},
];

export function getClientNameFromCode(client_code) {
    const client = _.find(CLIENTS, {code: client_code});
    if(!_.isEmpty(client)) {
        return client.name;
    } else {
        return client_code;
    }
}

export const EVENTS = [
    {code: "INPUT_FIELDS_RETURN", name: "INPUT_FIELDS_RETURN"},
    {code: "LEAD_DETAILS_RETURN", name: "LEAD_DETAILS_RETURN"},
    {code: "LEAD_CREATED", name: "LEAD_CREATED"},
    {code: "LEAD_UPDATED", name: "LEAD_UPDATED"},
]

export const ACTIONS = [
    {
        code: "disable_edit_on_user_role_and_first_update_type",
        name: "Disable Lead Edit",
        attributes: [],
    },
    {
        code: "hide_fields_last_update_type",
        name: "Hide Input Fields",
        attributes: [],
    },
    {
        code: "call_slack_webhook",
        name: "Call Slack Webhook",
        attributes: [],
    },
    {
        code: "call_twilio_webhook",
        name: "Call Twilio Webhook",
        attributes: [],
    },
];

export function getActionNameFromCode(action_code) {
    const action = _.find(ACTIONS, {code: action_code});
    if (!_.isEmpty(action)) {
        return action.name;
    } else {
        return action_code;
    }
}

export const ATTRIBUTES = {
    "disable_edit_for_role" : []
};


