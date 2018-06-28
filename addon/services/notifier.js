import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { assign } from '@ember/polyfills';
import { cancel, later } from '@ember/runloop';
import Service from '@ember/service';
import config from 'ember-get-config';

/**
 * The Notifier service is the public API that provides access to displaying and adding or removing
 * notifications.
 *
 * @class NotifierService
 * @public
 */
export default Service.extend({
  /**
   * Notification array.
   *
   * @property notification
   * @type {ember/array}
   */
  notifications: null,

  init() {
    this._super(...arguments);
    this.set('notifications', A());

    const conf = config['emberNotifier'] || {};

    // styling
    this.set('primaryClass', conf.primaryClass || 'is-primary');
    this.set('primaryIcon', conf.primaryIcon || 'fas fa-bell');
    this.set('infoClass', conf.infoClass || 'is-info');
    this.set('infoIcon', conf.infoIcon || 'fas fa-info');
    this.set('successClass', conf.successClass || 'is-success');
    this.set('successIcon', conf.successIcon || 'fas fa-check');
    this.set('warningClass', conf.warningClass || 'is-warning');
    this.set('warningIcon', conf.warningIcon || 'fas fa-exclamation');
    this.set('dangerClass', conf.dangerClass || 'is-danger');
    this.set('dangerIcon', conf.dangerIcon || 'fas fa-fire');
    this.set('secondaryClass', conf.secondaryClass || 'is-secondary');
    this.set('secondaryIcon', conf.secondaryIcon || 'fas fa-comment');

    // options
    this.set('duration', conf.duration || 4200);
  },

  /**
   * Add a primary styled notification.
   *
   * @method primary
   * @param {string} message The notification message.
   * @param {Object} [options] Optional notification options.
   */
  primary(message, options) {
    this.add(assign({
      message,
      type: this.get('primaryClass'),
      icon: this.get('primaryIcon'),
    }, options));
  },

  /**
   * Add an info styled notification.
   *
   * @method info
   * @param {string} message The notification message.
   * @param {Object} [options] Optional notification options.
   */
  info(message, options) {
    this.add(assign({
      message,
      type: this.get('infoClass'),
      icon: this.get('infoIcon'),
    }, options));
  },

  /**
   * Add a success styled notification.
   *
   * @method success
   * @param {string} message The notification message.
   * @param {Object} [options] Optional notification options.
   */
  success(message, options) {
    this.add(assign({
      message,
      type: this.get('successClass'),
      icon: this.get('successIcon'),
    }, options));
  },

  /**
   * Add a warning styled notification.
   *
   * @method warning
   * @param {string} message The notification message.
   * @param {Object} [options] Optional notification options.
   */
  warning(message, options) {
    this.add(assign({
      message,
      type: this.get('warningClass'),
      icon: this.get('warningIcon'),
    }, options));
  },

  /**
   * Add a danger styled notification.
   *
   * @method danger
   * @param {string} message The notification message.
   * @param {Object} [options] Optional notification options.
   */
  danger(message, options) {
    this.add(assign({
      message,
      type: this.get('dangerClass'),
      icon: this.get('dangerIcon'),
    }, options));
  },

  /**
   * Add a secondary styled notification.
   *
   * @method secondary
   * @param {string} message The notification message.
   * @param {Object} [options] Optional notification options.
   */
  secondary(message, options) {
    this.add(assign({
      message,
      type: this.get('secondaryClass'),
      icon: this.get('secondaryIcon'),
    }, options));
  },

  /**
   * Add a custom notification.
   *
   * @method add
   * @param {Object} options Notification options.
   * @param {string} options.type Styled class name.
   * @param {number} options.duration Remove notification after "n" ms. Disable scheduled removal
   * with a value of "0".
   * @param {string} [options.title] Optional title.
   * @param {string} [options.message] Optional message.
   * @param {string} [options.messageComponent] Optional message component name.
   * @param {string} [options.icon] Optional Icon name or class name.
   * @param {function} [options.onRemove] Callback function when notification is removed.
   */
  add(options = {}) {
    if (!options.message && !options.messageComponent) {
      throw new Error('No message or messageComponent set.');
    }

    const defaultOptions = EmberObject.create({
      type: this.get('primaryClass'),
      duration: this.get('duration'),
      timer: null,
      onRemove: () => void 0,
    });

    const notification = assign(defaultOptions, options);
    this.get('notifications').insertAt(0, notification);

    if (notification.duration > 0) {
      this.scheduleRemoval(notification);
    }
  },

  /**
   * Remove a notification.
   *
   * @method remove
   * @param {Object} notification The notification to remove.
   */
  remove(notification) {
    this.cancelRemoval(notification);
    later(this, () => {
      notification.onRemove();
      this.get('notifications').removeObject(notification);
    }, 100);
  },

  /**
   * Remove all notifications.
   *
   * @method empty
   */
  empty() {
    this.get('notifications').forEach(notification => this.remove(notification));
  },

  /**
   * Schedule removal of notification based on duration property.
   *
   * @method scheduleRemoval
   * @param {Object} notification The notification to schedule the removal on.
   */
  scheduleRemoval(notification) {
    const timer = later(this, () => {
      this.remove(notification);
    }, notification.get('duration'));
    notification.set('timer', timer);
  },

  /**
   * Cancel scheduled removal of notification.
   *
   * @method cancelRemoval
   * @param {Object} notification The notification to cancel the timer on.
   */
  cancelRemoval(notification) {
    cancel(notification.get('timer'));
  },
});