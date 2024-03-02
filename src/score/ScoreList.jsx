import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState, useRef } from "react";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { ScoreService } from "./ScoreService";
import { useNavigate } from "react-router-dom";

const ScoreList = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const scoreService = new ScoreService();
  const [customers, setCustomers] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    setCustomers([
      {
        id: 1001,
        name: "James Butt",
      },
      {
        id: 1002,
        name: "James Butt",
      },
      {
        id: 1003,
        name: "James Butt",
      },
      {
        id: 1004,
        name: "James Butt",
      },
    ]);
  }, []);

  const actionTemplate = (item) => {
    return (
      <>
        <span>
          <Button
            icon="pi pi-trash"
            rounded
            text
            severity="danger"
            aria-label="Cancel"
            onClick={() => confirm(item.id)}
          />
          <Button icon="pi pi-pencil" rounded text aria-label="Filter" />
        </span>
      </>
    );
  };
  const confirm = (event) => {
    setId(event);
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  const accept = () => {
    scoreService
      .scoreCardDelete(id)
      .then((res) => {
        toast.current.show({
          severity: "info",
          summary: "Confirmed",
          detail: res.message,
          life: 3000,
        });
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error,
          life: 3000,
        });
      });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };
  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup />
      <div className="grid">
        <div className="col-12 flex justify-content-end">
          <Button
            label="Score Card"
            icon="pi pi-plus"
            onClick={() => {
              navigate("/single-card", { state: { actionType: "add" } });
            }}
          />
        </div>
        <div className="col-12 card">
          <DataTable
            value={customers}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="name" header="Name"></Column>
            <Column body={actionTemplate} header="Action"></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default ScoreList;
