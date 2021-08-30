/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import NotificationMiniCard from "./NotificationMiniCard";
import Pusher from "pusher-js";
import Push from "push.js";
import { NOTIFICATIONS } from "../graphql/queries/notifications";
import { useHistory, Link } from "react-router-dom";
import { PUSHER_KEY, PUSHER_CLUSTER, CHANNEL, EVENT } from "../graphql/config";
import { useAuth } from "context/AuthContext";

let all_notifs = [];

const NotifcIcon = () => {
  const [notifications, setNotifications] = useState([]);
  const history = useHistory();
  const [total, settotal] = useState(0);
  const { user } = useAuth();
  const { data } = useQuery(NOTIFICATIONS, {
    variables: {
      id: user?.employee?.employee_id || 1,
      page: 1,
      first: 100,
    },
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (data) {
      setNotifications(
        data.readSystemNotifications?.employee_notification.data || []
      );
      settotal(
        data.readSystemNotifications?.employee_notification.paginatorInfo.total
      );
      all_notifs = data.readSystemNotifications?.employee_notification.data;
    }
  }, [data]);

  React.useEffect(() => {
    var pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
    });
    pusher.subscribe(CHANNEL);
    pusher.bind(EVENT, (notif) => {
      const newNotif = {
        employee_notification_id: JSON.parse(notif.system_data)
          .employee_notification_id[user?.employee?.employee_id],
        system_notification: {
          ...JSON.parse(notif.system_data),
        },
      };
      setNotifications([newNotif, ...all_notifs]);
      all_notifs = [newNotif, ...all_notifs];
      if (JSON.parse(notif.system_data).owner_id != user.employee.employee_id) {
        Push.create("KEK-Re Notification", {
          body: notif.message,
          icon: "/ms-icon-70x70.png",
          timeout: 4000,
          onClick: function () {
            history.push({
              pathname: "/admin/notifications",
              state: { notification: JSON.parse(notif.system_data) },
            });
            this.close();
          },
        });
      }
    });
    return () => {
      pusher.unbind_all();
      pusher.unsubscribe(CHANNEL);
    };
  }, []);

  return (
    <div className="dropdown d-inline-block dropright">
      <button
        type="button"
        className="btn header-item noti-icon waves-effect"
        id="page-header-notifications-dropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="badge badge-soft-danger badge-soft-pill mb-2">
          {total}
        </span>
        <i className="bx bx-bell bx-tada"></i>
      </button>
      <div
        className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
        aria-labelledby="page-header-notifications-dropdown"
      >
        <div className="p-3">
          <div className="row align-items-center">
            <div className="col">
              <h6 className="m-0">System logs</h6>
            </div>
            <div className="col-auto">
              <a className="small"> Clear All</a>
            </div>
          </div>
        </div>
        <div data-simplebar style={{ maxHeight: 230, overflow: "scroll" }}>
          <div>
            {notifications.map((notif, key) => {
              return <NotificationMiniCard key={key} notification={notif} />;
            })}
          </div>
        </div>
        <div className="p-2 border-top">
          <Link
            to="/admin/notifications"
            className="btn btn-sm btn-link font-size-14 btn-block text-center"
          >
            <i className="mdi mdi-arrow-right-circle mr-1"></i> View More..
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotifcIcon;
