
const St = imports.gi.St;
const Main = imports.ui.main;
const Util = imports.misc.util;
const Shell = imports.gi.Shell;
const app = Shell.AppSystem.get_default().lookup_app("slack.desktop");

let text, button;

function _showSlack() {
  if(app == null) {
    throw new Error("Could not find Slack! Make sure that the Desktop entry file 'slack.desktop' is available.");
  }

  if (app.get_state() == 0) {
    Util.spawn(['slack']);
  } 
}

function init() {
  button = new St.Bin({ style_class: 'panel-button',
			reactive: true,
			can_focus: true,
			x_fill: true,
			y_fill: false,
			track_hover: true });

  let icon = new St.Icon({ icon_name: 'slack',
			   icon_size: 25 });

  button.set_child(icon);
  button.connect('button-press-event', _showSlack);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
