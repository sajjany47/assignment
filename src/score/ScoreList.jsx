import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { ScoreService } from "./ScoreService";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader";

const ScoreList = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const scoreService = new ScoreService();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    scoreCardList();
  }, []);

  const scoreCardList = () => {
    setLoading(true);
    scoreService
      .scoreCardList()
      .then((res) => {
        setCustomers(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err[0]?.detail?.msg,
          life: 3000,
        });
      });
  };
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
          <Button
            icon="pi pi-pencil"
            rounded
            text
            aria-label="Filter"
            onClick={() =>
              navigate("/single-card", {
                state: { actionType: "edit", id: item.id },
              })
            }
          />
        </span>
      </>
    );
  };
  const confirm = (id) => {
    setLoading(true);
    scoreService
      .scoreCardDelete(id)
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Score card deleted successfully",
          life: 3000,
        });
      })
      .catch((error) => {
        setLoading(false);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error,
          life: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
        scoreCardList();
      });
  };

  return (
    <>
      {loading && <Loader />}
      <Toast ref={toast} />
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
            <Column field="title" header="Name"></Column>
            <Column body={actionTemplate} header="Action"></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default ScoreList;
