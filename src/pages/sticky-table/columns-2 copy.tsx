import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CameraIcon from '@mui/icons-material/Camera';

export const COLUMNS = [
    {
        Header: 'Submission Date',
        Footer: 'Submission Date',
        accessor: 'date',
        headerIcon: <CalendarMonthIcon fontSize="medium" />,
        sticky: 'left',
    },
    {
        Header: 'Station',
        Footer: 'Station',
        accessor: 'station_id',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
        sticky: 'left',
    },

    {
        Header: 'Street',
        Footer: 'Street',
        accessor: 'street',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Location',
        Footer: 'Location',
        accessor: 'location',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'ARAL WERBEELEMENT TYP',
        Footer: 'ARAL WERBEELEMENT TYP',
        accessor: 'title',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Werbeelement Anzahl',
        Footer: 'Werbeelement Anzahl',
        accessor: 'advertisingElement',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Datum/Time',
        Footer: 'Datum/Time',
        accessor: 'datum/time',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Installationshöhe',
        Footer: 'Installationshöhe',
        accessor: 'height',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Installations-Position',
        Footer: 'Installations-Position',
        accessor: 'position',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Bauart',
        Footer: 'bauart',
        accessor: 'bauart',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'Wartungsempfehlungen',
        Footer: 'Wartungsempfehlungen',
        accessor: 'maintenance',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'vermutetes Alter des Elementes',
        Footer: 'vermutetes Alter des Elementes',
        accessor: 'assumedAge',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Risk Priorization Tool Factor',
        Footer: 'Risk Priorization Tool Factor',
        accessor: 'riskPrioritization',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Visueller Erhaltungszustand',
        Footer: 'Visueller Erhaltungszustand',
        accessor: 'visualState',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'Montage nach Hersteller-Richtlinie',
        Footer: 'Montage nach Hersteller-Richtlinie',
        accessor: 'assemblyAccording',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Prüfung ob Montagerichtlinie befolgt wurde',
        Footer: 'Prüfung ob Montagerichtlinie befolgt wurde',
        accessor: 'checkWhether',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Befestigung an Tragstruktur',
        Footer: 'Befestigung an Tragstruktur',
        accessor: 'attachmentTo',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Wenn folgende 3 Punkte erfüllt sind ist kein Handlungsbedarf für die Verbindungen gegeben',
        Footer: 'Wenn folgende 3 Punkte erfüllt sind ist kein Handlungsbedarf für die Verbindungen gegeben',
        accessor: 'connections',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Bewegungs- und Anregungstest',
        Footer: 'Bewegungs- und Anregungstest',
        accessor: 'stimulationTest',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Auszutauschende Befestigungselemente',
        Footer: 'Auszutauschende Befestigungselemente',
        accessor: 'fasteners',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Befestigungslösung als Ersatz',
        Footer: 'Befestigungslösung als Ersatz',
        accessor: 'fasteningSolution',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Technische Integrität und Unversehrtheit in Ordnung?',
        Footer: 'Technische Integrität und Unversehrtheit in Ordnung?',
        accessor: 'technicalIntegrity',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Sind bereits Hilfskonstruktionen zur Sicherung angebracht worden?',
        Footer: 'Sind bereits Hilfskonstruktionen zur Sicherung angebracht worden?',
        accessor: 'auxiliaryConstructions',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Optischer Eindruck in Ordnung?',
        Footer: 'Optischer Eindruck in Ordnung?',
        accessor: 'opticalImpression',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Technischer Stand der Befestigungen in Ordnung?',
        Footer: 'Technischer Stand der Befestigungen in Ordnung?',
        accessor: 'fastenings',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Angemessenheit der Gesamt-Installation in Ordnung?',
        Footer: 'Angemessenheit der Gesamt-Installation in Ordnung?',
        accessor: 'appropriateness',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Sonstige Bemerkungen',
        Footer: 'Sonstige Bemerkungen',
        accessor: 'otherRemarks',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Vorname',
        Footer: 'Vorname',
        accessor: 'firstName',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Nachname',
        Footer: 'Nachname',
        accessor: 'surname',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Datum',
        Footer: 'Datum',
        accessor: 'datesubmit',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Images',
        Footer: 'Images',
        accessor: 'image',
        disableSortBy: true,
        Cell: (tableProps: any) => {
            const images = tableProps.row.original.image;
            const isValid = images && Array.isArray(images);
            return isValid ? (
                images.map((pic: any) => {
                    return <img width={40} height={40} src={pic} alt={pic} />;
                })
            ) : (
                <></>
            );
        },
        width: 200,
        headerIcon: <CameraIcon fontSize="medium" />,
    },

    // //end
    // {
    //     Header: 'Photo Stability',
    //     Footer: 'Photo Stability',
    //     accessor: 'photoStability',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    //     sticky: 'left',
    // },
    // {
    //     Header: 'Photo Repair Work',
    //     Footer: 'Photo Repair Work',
    //     accessor: 'photoRepairWork',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    //     sticky: 'left',
    // },
    // {
    //     Header: 'Image Appearance',
    //     Footer: 'Image Appearance',
    //     accessor: 'imageAppearance',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    //     sticky: 'left',
    // },
    // {
    //     Header: 'First Name',
    //     Footer: 'First Name',
    //     accessor: 'firstName',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Surname',
    //     Footer: 'Surname',
    //     accessor: 'surname',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Date submit',
    //     Footer: 'Date submit',
    //     accessor: 'datesubmit',
    //     headerIcon: <CalendarMonthIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Signature',
    //     Footer: 'Signature',
    //     accessor: 'signature',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Station Id',
    //     Footer: 'Station Id',
    //     accessor: 'station_id',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Street',
    //     Footer: 'Street',
    //     accessor: 'street',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Location',
    //     Footer: 'Location',
    //     accessor: 'location',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Elemeny Type',
    //     Footer: 'Elemeny Type',
    //     accessor: 'elemenyType',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Advertising Element',
    //     Footer: 'Advertising Element',
    //     accessor: 'advertisingElement',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Date',
    //     Footer: 'Date',
    //     accessor: 'date',
    //     headerIcon: <CalendarMonthIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Time',
    //     Footer: 'Time',
    //     accessor: 'time',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Installation Height',
    //     Footer: 'Installation Height',
    //     accessor: 'installationHeight',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Installation Position',
    //     Footer: 'Installation Position',
    //     accessor: 'installationPosition',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Type',
    //     Footer: 'Type',
    //     accessor: 'type',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Maintenance',
    //     Footer: 'Maintenance',
    //     accessor: 'maintenance',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Assumed Age',
    //     Footer: 'Assumed Age',
    //     accessor: 'assumedAge',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Risk Prioritization',
    //     Footer: 'Risk Prioritization',
    //     accessor: 'riskPrioritization',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Visual State',
    //     Footer: 'Visual State',
    //     accessor: 'visualState',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Assembly According',
    //     Footer: 'Assembly According',
    //     accessor: 'assemblyAccording',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Check Whether',
    //     Footer: 'Check Whether',
    //     accessor: 'checkWhether',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Attachment To',
    //     Footer: 'Attachment To',
    //     accessor: 'attachmentTo',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Connections',
    //     Footer: 'Connections',
    //     accessor: 'connections',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Stimulation Test',
    //     Footer: 'Stimulation Test',
    //     accessor: 'stimulationTest',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Fasteners',
    //     Footer: 'Fasteners',
    //     accessor: 'fasteners',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Fastening Solution',
    //     Footer: 'Fastening Solution',
    //     accessor: 'fasteningSolution',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Technical Integrity',
    //     Footer: 'Technical Integrity',
    //     accessor: 'technicalIntegrity',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Auxiliary Constructions',
    //     Footer: 'Auxiliary Constructions',
    //     accessor: 'auxiliaryConstructions',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Optical Impression',
    //     Footer: 'Optical Impression',
    //     accessor: 'opticalImpression',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Fastenings',
    //     Footer: 'Fastenings',
    //     accessor: 'fastenings',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Appropriateness',
    //     Footer: 'Appropriateness',
    //     accessor: 'appropriateness',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Other Remarks',
    //     Footer: 'Other Remarks',
    //     accessor: 'otherRemarks',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Is Approved',
    //     Footer: 'Is Approved',
    //     accessor: 'is_approved',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Created At',
    //     Footer: 'Created At',
    //     accessor: 'created_at',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Title',
    //     Footer: 'Title',
    //     accessor: 'title',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Height',
    //     Footer: 'Height',
    //     accessor: 'height',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },
    // {
    //     Header: 'Image',
    //     Footer: 'Image',
    //     accessor: 'image',
    //     headerIcon: <AssignmentIndIcon fontSize="medium" />,
    // },

    // end
];

// around 45 columns
