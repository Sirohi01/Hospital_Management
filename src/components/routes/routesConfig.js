    import Dashboard from "../../pages/Dashboard";
    import Login from "../../pages/Login";
    import PatientRegistration from "../../pages/PatientRegistration";
    import Patients from "../../pages/patients";
    import AppLayout from "../../AppLayout";
    import { ROUTES } from "./RoutesEnum";

    export const routesConfig = [
    {
        path: ROUTES.LOGIN,
        element: Login,
        type: "public",
    },
    {
        path: ROUTES.DASHBOARD,
        element: Dashboard,
        type: "private",
        layout: AppLayout,
    },
    {
        path: ROUTES.PATIENT_REGISTRATION,
        element: PatientRegistration,
        type: "private",
        layout: AppLayout,
    },
    {
        path: ROUTES.Registered_Patient,
        element: Patients,
        type: "private",
        layout: AppLayout,
    },
    ];