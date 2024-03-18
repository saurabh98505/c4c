import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CameraIcon from '@mui/icons-material/Camera';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
const getExtension = (filename) => {
    return filename.split('.').pop();
};

export const COLUMNS = [
    {
        Header: 'Submission Date',
        Footer: 'Submission Date',
        accessor: 'submission_date',
        headerIcon: <CalendarMonthIcon fontSize="medium" />,
        sticky: 'left',
    },
    {
        Header: 'Approval Status',
        Footer: 'Approval Status',
        accessor: 'status',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
        sticky: 'left',
    },
    {
        Header: 'Timer',
        Footer: 'Timer',
        accessor: 'timer',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Geo-Location',
        Footer: 'Geo-Location',
        accessor: 'geo',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Geben Sie die Tankstellennummer ein',
        Footer: 'Geben Sie die Tankstellennummer ein',
        accessor: 'geben_sie_die_tankstellennummer_ein',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Strasse',
        Footer: 'Strasse',
        accessor: 'strasse',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Ort',
        Footer: 'Ort WERBEELEMENT TYP',
        accessor: 'ort',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'Insp-Nr',
        Footer: 'Insp-Nr',
        accessor: 'insp_nr',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'ID',
        Footer: 'ID',
        accessor: 'retro_id',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header:'Montierte Lösung',
        Footer: 'Montierte Lösung',
        accessor:'montierteLosung',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'Installationshöhe Serverschrank',
        Footer: 'Installationshöhe Serverschrank',
        accessor: 'eingangsbox_vorhanden',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Installationshöhe Position',
        Footer: 'Installationshöhe Position',
        accessor: 'servers',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Abmessungen Serverschrank',
        Footer: 'Abmessungen Serverschrank',
        accessor: 'abmessugen',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'Anzahl Blech-Lagen übereinander',
        Footer: 'Anzahl Blech-Lagen übereinander',
        accessor: 'anzahl_Blech_Lagen_übereinander',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'IST-Zustand der Konturbefestigung',
        Footer: 'IST-Zustand der Konturbefestigung',
        accessor: 'ist_zustand_der_konturbefestigung',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'Befestigungs-Untergrund',
        Footer: 'Befestigungs-Untergrund',
        accessor: 'befestigungs_untergrund',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'Aa Sonstige Bemerkungen',
        Footer: 'Aa Sonstige Bemerkungen',
        accessor: 'sonstige_bemerkungen',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    // {
    //     Header: 'Aufmaß-Skizze bitte hier hochladen',
    //     Footer: 'Aufmaß-Skizze bitte hier hochladen',
    //     accessor: 'aufmaß_skizze_bitte_hier_hochladen',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    //     Cell: (tableProps: any) => {
    //         const images =
    //             tableProps.row.original?.aufmaß_skizze_bitte_hier_hochladen;
    //         return images.map((pic: any) => (
    //             <img width={40} height={40} src={pic} alt={pic} />
    //         ));
    //     },
    // },

    {
        Header: 'Foto-Upload',
        Footer: 'Foto-Upload',
        accessor: 'foto_upload',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
        Cell: (tableProps: any) => {
            const images = tableProps.row.original?.foto_upload;
            return images.map((pic: any) =>
                getExtension(pic).toLowerCase() === 'pdf' ? (
                    <a href={pic} target="_blank"><PictureAsPdfIcon color='primary'/></a>
                ) : (
                    <img width={40} height={40} src={pic} alt={pic} />
                )
            );
        },
    },

    {
        Header: 'Datei-Upload',
        Footer: 'Datei-Upload',
        accessor: 'datei_upload',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
        Cell: (tableProps: any) => {
            const images = tableProps.row.original?.datei_upload;
            return images.map((pic: any) =>
                getExtension(pic).toLowerCase() === 'pdf' ? (
                    <a href={pic} target="_blank" ><PictureAsPdfIcon color='primary'/></a>
                ) : (
                    <img width={40} height={40} src={pic} alt={pic} />
                )
            );
        },
    },

    {
        Header: 'Name des verantwortlichen Monteurs',
        Footer: 'Name des verantwortlichen Monteurs',
        accessor: 'name_des_verantwortlichen_monteurs',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'Datum',
        Footer: 'Datum',
        accessor: 'datum2',
        headerIcon: <CalendarMonthIcon fontSize="medium" />,
    },

    // {
    //     Header: 'Unterschrift',
    //     Footer: 'Unterschrift',
    //     accessor: 'unterschrift',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    //     Cell: (tableProps: any) => {
    //         const images = tableProps.row.original.unterschrift?.split('/n');
    //         const isValid = images && Array.isArray(images);
    //         return isValid ? (
    //             images.map((pic: any) => (
    //                 <img width={40} height={40} src={pic} alt={pic} />
    //             ))
    //         ) : (
    //             <></>
    //         );
    //     },
    // },
];

// around 45 columns
