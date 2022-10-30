import moment from "moment";
import { v4 as UUIDV4 } from "uuid";
import store from "../redux/store";
import { encryptedText } from "./helper";

export function setPatientRecord(data) {
  console.log(data);
  const { facilityId, username } = store.getState().auth.user;
  return window.contract.setPatientRecord({
    patientRecord: {
      facilityId: facilityId,
      title: "",
      accountType: encryptedText(data.accountType||''),
      surname: encryptedText(data.surname||''),
      firstname: encryptedText(data.firstname||''),
      gender: encryptedText(data.gender||''),
      maritalStatus: encryptedText(data.maritalStatus||''),
      DOB: encryptedText(data.dob||''),
      dateCreated: moment().format("YYYY-MM-DD"),
      phoneNumber: encryptedText(data.contactPhone||''),
      email: encryptedText(data.contactEmail||''),
      occupation: encryptedText(data.occupation||''),
      address: encryptedText(data.address||''),
      kinName: encryptedText(data.nextOfKinName||''),
      kinRelationship: encryptedText(data.nextOfKinRelationship||''),
      kinPhone: encryptedText(data.nextOfKinPhone||''),
      kinEmail: encryptedText(data.nextOfKinEmail||''),
      kinAddress: encryptedText(data.nextOfKinAddress||''),
      patientStatus: encryptedText(data.maritalStatus||''),
      other: "",
      age: "0",
      state: "",
      lga: "",
      accountNo: data.clientAccount,
      beneficiaryNo: data.clientBeneficiaryAcc,
      balance: data.depositAmount,
      id: UUIDV4(),
      patientId: `${data.clientAccount}-${data.clientBeneficiaryAcc}`,
      enteredBy: username,
      assigned_to: "",
      createdAt: moment().format("YYYY-MM-DD"),
      date_assigned: "",
      status: "",
      hematology: "",
      microbiology: "",
      chem_path: "",
      radiology: "",
      seen_by: "",
      date_seen: "",
    },
  });
}

export function _assignPatient({ date, patientId, username }) {
  console.log({ date, patientId, username });
  return window.contract.assignPatient({
    username: username,
    date: date,
    patientId: patientId,
  });
}

export function addConsultation(data) {
  const date = moment().format("YYYY-MM-DD");
  console.log(data);
  return window.contract.set_consultation({
    payload: {
      id: UUIDV4(),
      patient_id: data.patient_id,
      user_id: data.userId,
      consultation_notes: encryptedText(data.presentingComplaint||''),
      treatment_plan: encryptedText(data.treatmentPlan || ""),
      decision: data.patientStatus,
      dressing_request: encryptedText(data.dressingInfo || ""),
      nursing_request: encryptedText(data.nursingReq || ""),
      nursing_request_status: "pending",
      facility_id: data.facilityId,
      created_at: date,
      treatment_plan_status: "pending",
      treated_by: data.treated_by,
    },
  });
}

export function viewAllPatientRecords() {
  return window.contract.getAllPatientRecords();
}

export function getConsultationHistory() {
  return window.contract.get_consultation_history();
}
