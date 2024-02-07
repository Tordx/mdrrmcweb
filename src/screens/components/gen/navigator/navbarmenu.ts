import { faChartColumn, faEnvelope, faLocationDot, faSpaghettiMonsterFlying, faTriangleExclamation, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbarmenu = [
    {
        id: 1,
        title: 'Statistics',
        path: '/admin/statistics',
        icon: faChartColumn,
    },
    {
        id: 2,
        title: 'Registration',
        path: '/admin/registration',
        icon: faUser
    },
    {
        id: 3,
        title: 'Evacuation Centers',
        path: '/admin/centers',
        icon: faLocationDot
    },
    {
        id: 4,
        title: 'SMS',
        path: '/admin/sms',
        icon: faEnvelope,
    },
    {
        id: 5,
        title: 'Disasters',
        path: '/admin/disasters',
        icon: faTriangleExclamation
    }
]

export default Navbarmenu;