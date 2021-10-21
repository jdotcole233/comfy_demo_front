/* eslint-disable no-throw-literal */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import NotificationCard from "./NotifactionCard";
import NOtSelected from "../../assets/not_Selected_notif.gif";
import EmailComponent from "./EmailComponent";
import BusinessComponent from "./BusinessComponent";
import OfferComponent from "./SystemNotificationComponent";
import InsurerComponent from "./InsurerComponent";
import ReinsurerComponent from "./ReinsurerComponent";
import CliamComponent from "./ClaimComponent";
import DocumentSMS from "./DocumentVerification";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { useQuery, useMutation } from "react-apollo";
import { NOTIFICATIONS } from "../../graphql/queries/notifications";
import {
  DELETE_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
} from "../../graphql/mutattions/Notifications";
import { Input, Loader } from "../../components";
import { useAuth } from "../../context/AuthContext";

const filterNotifications = (notifications, selectedFilters) => {
  if (selectedFilters.length === 0) return notifications;
  return notifications.filter((n) =>
    selectedFilters.includes(n.system_notification.notification_type)
  );
};

const notificationTypes = [
  "SYSTEM:EMAIL",
  "SYSTEM:BUSINESS",
  "SYSTEM:OFFER",
  "SYSTEM:TREATY",
  "SYSTEM:INSURER",
  "SYSTEM:REINSURER",
  "SYSTEM:CLAIM",
  "DOCUMENT:SMS",
];

export default () => {
  const { user } = useAuth();
  const { state: notifState } = useLocation();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [paginatorInfo, setPaginatorInfo] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION);
  const [clear, { loading: clearing }] = useMutation(CLEAR_NOTIFICATIONS, {
    refetchQueries: [
      {
        query: NOTIFICATIONS,
        variables: { id: user?.employee?.employee_id },
      },
    ],
  });
  const selectNotification = (notification) => {
    setSelectedNotification(notification);
  };
  const { data, refetch, loading } = useQuery(NOTIFICATIONS, {
    variables: {
      id: user?.employee?.employee_id,
      page,
      first: 100,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data && selectedFilters) {
      setNotifications((prev) => [
        ...prev,
        ...data.readSystemNotifications?.employee_notification?.data,
      ]);
      setPaginatorInfo(
        data?.readSystemNotifications?.employee_notification?.paginatorInfo
      );
    }
  }, [data, selectedFilters]);

  useEffect(() => {
    if (paginatorInfo && paginatorInfo.hasMorePages) {
    }
  }, [paginatorInfo]);

  useEffect(() => {
    if (notifState && notifState.notification) {
      setSelectedNotification(notifState.notification);
    }
  }, [notifState, selectedFilters]);

  const renderNotification = (selected) => {
    console.log(selected);
    switch (selected?.system_notification?.notification_type) {
      case "SYSTEM:EMAIL":
        return <EmailComponent data={selected} />;
      case "SYSTEM:OFFER":
        return <OfferComponent data={selected} />;
      case "SYSTEM:BUSINESS":
        return <BusinessComponent data={selected} />;
      case "SYSTEM:INSURER":
        return <InsurerComponent data={selected} />;
      case "SYSTEM:REINSURER":
        return <ReinsurerComponent data={selected} />;
      case "SYSTEM:CLAIM":
        return <CliamComponent data={selected} />;
      case "DOCUMENT:SMS":
        return <DocumentSMS data={selected} />;
      default:
        return <EmptyNotif />;
    }
  };

  const deleteNotificationLocal = (id) => {
    swal({
      icon: "warning",
      title: "Delete Notification ?",
      text: "This action will delete this notification",
      buttons: ["No", { text: "Yes", closeModal: false }],
    }).then((input) => {
      if (!input) throw {};
      deleteNotification({ variables: { id } })
        .then((_res) => {
          refetch();
          swal("Success", "Notification Deleted Successfully", "success");
        })
        .catch((_err) => {
          swal(
            "Whoops!",
            "An error occured while deleting notification",
            "error"
          );
        });
    });
  };

  const clearAllNotifications = (notifs) => {
    swal({
      icon: "warning",
      title: "Clear all ?",
      text: "This action clears all notifications",
      buttons: ["No", { text: "Yes" }],
    }).then((res) => {
      if (!res) throw {};
      clear({
        variables: {
          ids: [...notifs.map((el) => el.employee_notification_id)],
        },
      })
        .then((_res) => {
          setNotifications([]);
        })
        .catch((_err) => {});
    });
  };

  const loadMore = () => {
    if (paginatorInfo.hasMorePages) {
      setPage(paginatorInfo.currentPage + 1);
    }
  };

  const searchNotifications = (e) => {
    const value = e.target.value;
    if (value.length > 0) {
      setNotifications((prev) =>
        data.readSystemNotifications?.employee_notification?.data.filter((el) =>
          JSON.parse(el.system_notification.notification_content)
            .title.toUpperCase()
            .includes(value.toUpperCase())
        )
      );
    } else {
      setNotifications(
        data.readSystemNotifications?.employee_notification?.data
      );
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">Application logs</h4>

            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Dashboards</a>
                </li>
                <li className="breadcrumb-item active">System logs</li>
              </ol>
            </div>
          </div>
          <div className="card">
            <div className="bg-primary p-3">
              <span className="card-title text-white">
                Filter application logs
              </span>
            </div>
            <div className="card-body">
              <div className="row d-flex align-items-center">
                <div className="col-md-4">
                  <Input
                    label="Search"
                    onChange={searchNotifications}
                    placeholder="Search notifications by any term"
                  />
                </div>
                <div className="col-md-8">
                  <div className="row pl-4 mb-2">
                    <span className="font-weight-bold">
                      Group application logs by
                    </span>
                  </div>
                  <div className="d-flex w-auto">
                    {notificationTypes.map((el) => (
                      <Pill
                        key={el}
                        name={el}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="row d-flex justify-content-between">
                <p className="ml-2 text-muted d-flex align-items-center font-weight-medium">
                  All application notifications
                </p>
                {clearing ? (
                  <button className="btn btn-default">Clearing...</button>
                ) : (
                  <button
                    onClick={() => clearAllNotifications(notifications)}
                    className="btn btn-sm btn-square btn-danger"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div style={{ maxHeight: 700, height: 700, overflowY: "scroll" }}>
                {/* {JSON.stringify(selectedFilters)} */}
                {filterNotifications(notifications, selectedFilters).map(
                  (notif, key) => (
                    <NotificationCard
                      deleteNotif={deleteNotificationLocal}
                      key={key}
                      notification={notif}
                      onSelect={selectNotification}
                    />
                  )
                )}
                {!filterNotifications(notifications, selectedFilters)
                  .length && <p>Sorry no new notifications</p>}
              </div>
              <div className="row py-2">
                <div className="col-md-4">
                  <button
                    onClick={loadMore}
                    className="btn btn-info btn-sm btn-block"
                  >
                    {loading && (
                      <i className="bx bx-hourglass bx-spin mr-2"></i>
                    )}
                    {loading ? "loading..." : "Load more"}
                  </button>
                </div>
                <div className="col-md-8 justify-end">
                  <p>
                    {paginatorInfo?.lastItem}/{paginatorInfo?.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="row">
                {selectedNotification ? (
                  <p className="ml-2 text-muted font-weight-medium">
                    {
                      JSON.parse(
                        selectedNotification?.system_notification
                          .notification_content
                      ).title
                    }
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              <div style={{ maxHeight: 700, height: 700, overflowY: "scroll" }}>
                {renderNotification(selectedNotification)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyNotif = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img height="150" src={NOtSelected} alt="not selected" />
      <p className="my-4 text-muted font-weight-medium">
        Select a notification to view{" "}
      </p>
    </div>
  );
};

const Pill = ({ name, setSelectedFilters, selectedFilters = [] }) => {
  const onAdd = () => setSelectedFilters((prev) => [...prev, name]);
  const onRemove = () =>
    setSelectedFilters((prev) => prev.filter((f) => f !== name));

  const selected = selectedFilters.includes(name);

  return (
    <div
      onClick={selected ? onRemove : onAdd}
      className={`p-2  pointer font-weight-bold rounded ${
        selected ? "bg-primary text-white" : "bg-soft-primary text-primary"
      } ml-2`}
    >
      {name.split(":")[1]}
    </div>
  );
};
