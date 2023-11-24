import { Modal, Button, Stack } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";
import { useState } from "react";
import EditExpenseModal from "./EditExpenseModal";

export default function ViewAllExpensesModal({show, handleClose}) {
  const {deleteExpense, expenses} = useBudgets();

  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [editExpenseModalExpenseId, setEditExpenseModalExpenseId] = useState();

  function openEditExpenseModal(expId) {
    handleClose();
    setEditExpenseModalExpenseId(expId);
    setShowEditExpenseModal(true);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap="2">
              All Expenses :
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="vertical" gap="3">
            {expenses.map((expense) => (
              <Stack direction="horizontal" gap="2" key={expense.id}>
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="fs-5">
                  {currencyFormatter.format(expense.amount)}
                </div>
                <Button
                  onClick={() => openEditExpenseModal(expense.id)}
                  size="sm"
                  variant="outline-secondary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                  </svg>
                </Button>
                <Button
                  onClick={() => deleteExpense(expense.id)}
                  size="sm"
                  variant="danger"
                >
                  &times;
                </Button>
              </Stack>
            ))}
          </Stack>
        </Modal.Body>
      </Modal>

      <EditExpenseModal
      expenseId={editExpenseModalExpenseId}
      show={showEditExpenseModal}
      handleClose={() => setShowEditExpenseModal(false)}
      />
    </>
  );
}
