import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CameraIcon from '@mui/icons-material/Camera';

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
        Header: 'Freigabe Fertigung:',
        Footer: 'Freigabe Fertigung:',
        accessor: 'freigabe_fertigung',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Projekt-Abschluss',
        Footer: 'Projekt-Abschluss',
        accessor: 'projekt_abschluss',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Datensatz geprüft:',
        Footer: 'Datensatz geprüft:',
        accessor: 'datensatz_geprüft',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'fehlende Daten:',
        Footer: 'fehlende Daten:',
        accessor: 'fehlende_daten',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'geplante Fertigung',
        Footer: 'geplante Fertigung',
        accessor: 'geplante_fertigung',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'geplante Montage',
        Footer: 'geplante Montage',
        accessor: 'geplante_montage',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'IST-Ferigung',
        Footer: 'IST-Ferigung',
        accessor: 'ist_ferigung',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'IST-Montage',
        Footer: 'IST-Montage',
        accessor: 'ist_montage',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Höhe der Kontur ',
        Footer: 'Höhe der Kontur ',
        accessor: 'höhe_der_kontur ',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'Länge der Kontur',
        Footer: 'Länge der Kontur',
        accessor: 'länge_der_kontur',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },

    {
        Header: 'Rück-Kantung der Kontur',
        Footer: 'Rück-Kantung der Kontur',
        accessor: 'rück_kantung_der_kontur',
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
        accessor: 'id',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Ausführendes Unternehmen',
        Footer: 'Ausführendes Unternehmen',
        accessor: 'ausführendes_unternehmen',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
    },
    {
        Header: 'Mind. 4 Fotos der Fassadenbereiche umlaufend',
        Footer: 'Mind. 4 Fotos der Fassadenbereiche umlaufend',
        accessor: 'mind_4_Fotos_der_Fassadenbereiche_umlaufend',

        Cell: (tableProps: any) => {
            const images =
                tableProps.row.original.mind_4_Fotos_der_Fassadenbereiche_umlaufend?.split(
                    ','
                );
            const isValid = images && Array.isArray(images);
            return isValid ? (
                images.map((pic: any) => (
                    <img width={40} height={40} src={pic} alt={pic} />
                ))
            ) : (
                <></>
            );
        },
        width: 200,
        headerIcon: <CameraIcon fontSize="medium" />,
    },
    {
        Header: 'Bei Kontur-Demontage zurückzubauende Ausrüstungsgegenstände',
        Footer: 'Bei Kontur-Demontage zurückzubauende Ausrüstungsgegenstände',
        accessor: 'bei_kontur_demontage_zurückzubauende_ausrüstungsgegenstände',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
        Cell: (tableProps: any) => {
            return (
                <div
                    dangerouslySetInnerHTML={{
                        __html: tableProps.row.original
                            .bei_kontur_demontage_zurückzubauende_ausrüstungsgegenstände,
                    }}
                ></div>
            );
        },
        width: 400,
    },
    {
        Header: 'Abmessungen von rückspringenden Fassadenbereichen mit Abkantung',
        Footer: 'Abmessungen von rückspringenden Fassadenbereichen mit Abkantung',
        accessor:
            'abmessungen_von_rückspringenden_fassadenbereichen_mit_abkantung',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
        Cell: (tableProps: any) => {
            return (
                <div
                    dangerouslySetInnerHTML={{
                        __html: tableProps.row.original
                            .abmessungen_von_rückspringenden_fassadenbereichen_mit_abkantung,
                    }}
                ></div>
            );
        },
        width: 400,
    },

    {
        Header: 'Eingangsbox vorhanden',
        Footer: 'Eingangsbox vorhanden',
        accessor: 'eingangsbox_vorhanden',
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

    {
        Header: 'Aufmaß-Skizze bitte hier hochladen',
        Footer: 'Aufmaß-Skizze bitte hier hochladen',
        accessor: 'aufmaß_skizze_bitte_hier_hochladen',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
        Cell: (tableProps: any) => {
            const images =
                tableProps.row.original?.aufmaß_skizze_bitte_hier_hochladen;
            return images?.map((pic: any) => (
                <img width={40} height={40} src={pic} alt={pic} />
            ));
        },
    },

    {
        Header: 'Datei-Upload',
        Footer: 'Datei-Upload',
        accessor: 'datei_upload',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
        Cell: (tableProps: any) => {
            const images = tableProps.row.original?.datei_upload;
            return images?.map((pic: any) => (
                <img width={40} height={40} src={pic} alt={pic} />
            ));
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

    {
        Header: 'Unterschrift',
        Footer: 'Unterschrift',
        accessor: 'unterschrift',
        headerIcon: <AssignmentIndIcon fontSize="medium" />,
        Cell: (tableProps: any) => {
            const images = tableProps.row.original.unterschrift?.split('/n');
            const isValid = images && Array.isArray(images);
            return isValid ? (
                images.map((pic: any) => (
                    <img width={40} height={40} src={pic} alt={pic} />
                ))
            ) : (
                <></>
            );
        },
    },
    {
        Header: 'Handlungsbedarf Vorhanden',
        Footer: 'Handlungsbedarf Vorhanden',
        accessor: 'handlungsbedarf_vorhanden',
    },
    {
        Header: 'Gesamtlänge Kontur Austausch',
        Foooter: 'Gesamtlänge Kontur Austausch',
        accessor: 'gesamtlänge_kontur_austausch',
    },
    {
        Header: 'Cluster',
        Footer:'Cluster',
        accessor:'cluster'
    },
    {
        Header:'Fehlende Daten Other',
        Footer:'Fehlende Daten Other',
        accessor:'fehlende_daten_other'
    }
];

// around 45 columns
