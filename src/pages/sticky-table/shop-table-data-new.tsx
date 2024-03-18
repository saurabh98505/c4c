import {
    ArrowBackIosRounded,
    ArrowForwardIosRounded,
    SkipNextRounded,
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SkipPreviousIcon from '@mui/icons-material/SkipPreviousRounded';
import dayjs from 'dayjs';

import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    MenuItem,
    Modal,
    NativeSelect,
    Select,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import CsvDownload from 'react-csv-downloader';
import ImageGallery from 'react-image-gallery';
import {
    useBlockLayout,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable,
} from 'react-table';
import { useSticky } from 'react-table-sticky';
import { COLOR_CODES } from '../../utils/constants';
import GlobalFilter from './global-filter';
import { COLUMNS } from './shop-column-new';
import { IndeterminateCheckbox } from './table-checkboxes';
import { filterTypes } from './table-helper';
import { Styles } from './table-styles';
import LOGOS from '../../assets/logo.jpg';
import LOGO from '../../assets/logo.jpeg';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Form } from 'react-router-dom';
const IMAGE_COLUMN_NAMES = [
    'mind_4_Fotos_der_Fassadenbereiche_umlaufend',
    'aufmaß_skizze_bitte_hier_hochladen',
    'datei_upload',
    'unterschrift',
];
import {convert} from 'html-to-text'

export const ShopTableDataNew = () => {
    const columns = useMemo(() => COLUMNS, []);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [showButtonLoader, setShowButtonLoader] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [dataCSV, setExcelData] = useState<any[]>([]);
    const [dataLogin, setDataLogin] = useState<any>();
    const csvColumn: any = COLUMNS.map((column) => {
        let columnObj: any = {};
        // if (
        //     column.accessor !==
        //         'bei_kontur_demontage_zurückzubauende_ausrüstungsgegenstände' &&
        //     column.accessor !==
        //         'abmessungen_von_rückspringenden_fassadenbereichen_mit_abkantung'
        // ) {
        return {
            ...columnObj,
            key: column.accessor,
            label: column.Header,
        };
        // }
    });
    // delete csvColumn[21];
    // delete csvColumn[22];
    //     console.log(csvColumn);
    const doc = new jsPDF();

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    const commonCall = async () => {
        setShowLoader(true);

        const data: any = await axios.get('https://c4c-cen.com/api/getAllShop');

        // const response = data.response;
        const response = data.response;
        if (response && Array.isArray(response)) {
            const sanitizedArray = response.map((r: any) => {
                const mainObj: any = {};
                let checkboxTable: string = `<table summary="" cellpadding="4" cellspacing="0" border="0" style="font-size:10px;border-collapse:collapse;">`;
                let inputboxTable: string = `<table summary="" cellpadding="4" cellspacing="0" border="0" style="font-size:10px;border-collapse:collapse;">`;

                if (r.checkboxInputTable) {
                    for (let i = 0; i < r?.checkboxInputTable?.length; i++) {
                        if (i === 0) {
                            checkboxTable =
                                checkboxTable +
                                `<tr><th style="border:none">&nbsp;</th>`;
                            for (
                                let j = 1;
                                j < r.checkboxInputTable[0].length;
                                j++
                            ) {
                                checkboxTable =
                                    checkboxTable +
                                    `<th style="background:#eee;border:1px solid #ccc;text-align:center;width:${
                                        100 / r.checkboxInputTable[0].length
                                    }%">${r.checkboxInputTable[0][j]} </th>`;
                            }
                            checkboxTable = checkboxTable + `</tr>`;
                        } else {
                            checkboxTable =
                                checkboxTable +
                                `<tr>
                            <th style="background:#eee;border:1px solid #ccc;text-align:left;" nowrap="nowrap">${
                                r.checkboxInputTable[i].colname
                            }</th>
                            
                            <td align="center" style="background:#ffffff;border:1px solid #ccc;" >${
                                r.checkboxInputTable[i][
                                    r.checkboxInputTable[0][1]
                                ] == true
                                    ? `<img src="https://eu-submit.jotform.com/images/tick.png" height="16" width="16" alt="X" align="top" />`
                                    : `-`
                            }</td>
                            <td align="center" style="background:#ffffff;border:1px solid #ccc;" >${
                                r.checkboxInputTable[i][
                                    r.checkboxInputTable[0][2]
                                ] == true
                                    ? `<img src="https://eu-submit.jotform.com/images/tick.png" height="16" width="16" alt="X" align="top" />`
                                    : `-`
                            }</td>
                            <td align="center" style="background:#ffffff;border:1px solid #ccc;" >${
                                r.checkboxInputTable[i][
                                    r.checkboxInputTable[0][3]
                                ] == true
                                    ? `<img src="https://eu-submit.jotform.com/images/tick.png" height="16" width="16" alt="X" align="top" />`
                                    : `-`
                            }</td>
                            <td align="center" style="background:#ffffff;border:1px solid #ccc;" >${
                                r.checkboxInputTable[i][
                                    r.checkboxInputTable[0][4]
                                ] == true
                                    ? `<img src="https://eu-submit.jotform.com/images/tick.png" height="16" width="16" alt="X" align="top" />`
                                    : `-`
                            }</td>
                            <td align="center" style="background:#ffffff;border:1px solid #ccc;" >${
                                r.checkboxInputTable[i][
                                    r.checkboxInputTable[0][5]
                                ] == true
                                    ? `<img src="https://eu-submit.jotform.com/images/tick.png" height="16" width="16" alt="X" align="top" />`
                                    : `-`
                            }</td>
                            </tr>`;
                        }
                    }
                    `
                </table>`;
                }

                if (r.textInputTable) {
                    for (let i = 0; i < r?.textInputTable?.length; i++) {
                        if (i === 0) {
                            inputboxTable =
                                inputboxTable +
                                `<tr><th style="border:none">&nbsp;</th>`;
                            for (
                                let j = 1;
                                j < r.textInputTable[0].length;
                                j++
                            ) {
                                inputboxTable =
                                    inputboxTable +
                                    `<th style="background:#eee;border:1px solid #ccc;text-align:center;width:${
                                        100 / r.textInputTable[0].length
                                    }%">${r.textInputTable[0][j]} </th>`;
                            }
                            inputboxTable = inputboxTable + `</tr>`;
                        } else {
                            inputboxTable =
                                inputboxTable +
                                `<tr>
                            <th style="background:#eee;border:1px solid #ccc;text-align:left;" nowrap="nowrap">${r.textInputTable[i].colname}</th>
                            
                            <td align="center" style="background:#ffffff;border:1px solid #ccc;" >${r.textInputTable[i].hohe}</td>
                            <td align="center" style="background:#ffffff;border:1px solid #ccc;" >${r.textInputTable[i].lange}</td>
                            <td align="center" style="background:#ffffff;border:1px solid #ccc;" >${r.textInputTable[i].antungOben}</td>
                            <td align="center" style="background:#ffffff;border:1px solid #ccc;" >${r.textInputTable[i].kantungUnten}</td>
                            <td align="center" style="background:#ffffff;border:1px solid #ccc;" >${r.textInputTable[i].lagebeschreibung}</td>
                            
                            <td align="center" style="background:#ffffff;border:1px solid #ccc;" >${r.textInputTable[i].farbe}</td>
                            </tr>`;
                        }
                    }
                    inputboxTable = inputboxTable + `</table>`;
                }

                return {
                    ...mainObj,
                    submission_date: r.date,
                    status: r.is_approved,
                    geben_sie_die_tankstellennummer_ein: `${r.station_id}`,
                    strasse: `${r.street}`,
                    ort: `${r.location}`,
                    handlungsbedarf_vorhanden: `${r.vorhanden}`,
                    // projekt_abschluss: `${r.answers[114].answer}`,
                    // datensatz_geprüft: `${r.answers[108].answer}`,
                    // fehlende_daten: `${r.answers[116].answer}`,
                    // geplante_fertigung: `${
                    //     r.answers[110]?.answer ?? ''
                    // }`,
                    // geplante_montage: `${r.answers[111]?.answer ?? ''}`,
                    // ist_ferigung: `${r.answers[112]?.answer ?? ''}`,
                    // ist_montage: `${r.answers[113]?.answer ?? ''}`,
                    gesamtlänge_kontur_austausch: `${r.austausch ?? ''}`,
                    cluster: `${r.cluster ?? ''}`,
                    freigabe_fertigung: `${r.freigabe ?? ''}`,
                    projekt_abschluss: `${r.abschluss ?? ''}`,
                    datensatz_geprüft: `${r.gepruft ?? ''}`,
                    fehlende_daten: `${r.fehlende ?? ''}`,
                    geplante_fertigung: `${r.geplante ?? ''}`,
                    geplante_montage: `${r.montage ?? ''}`,
                    ist_ferigung: `${r.istferigung ?? ''}`,
                    ist_montage: `${r.istmontage ?? ''}`,
                    höhe_der_kontur: `${r.hohe ?? ''}`,
                    länge_der_kontur: `${r.langeder ?? ''}`,
                    rück_kantung_der_kontur: `${r.ruckkantung ?? ''}`,
                    form_id: r.form_id,
                    ausführendes_unternehmen: `${r.company ?? ''}`,
                    mind_4_Fotos_der_Fassadenbereiche_umlaufend: `${
                        r.image ?? ''
                    }`,
                    abmessungen_von_rückspringenden_fassadenbereichen_mit_abkantung: `${
                        inputboxTable ?? ''
                    }`,
                    eingangsbox_vorhanden: r.inbox ?? '',
                    anzahl_Blech_Lagen_übereinander: r.bleche ?? '',
                    ist_zustand_der_konturbefestigung: r.attachment ?? '',
                    befestigungs_untergrund: r.mounting ?? '',
                    sonstige_bemerkungen: r.sonstige ?? '',

                    name_des_verantwortlichen_monteurs:
                        r.firstName + ' ' + r.surname ?? '',
                    datum2: r.dateNew ?? '',
                    fehlende_daten_other: r?.fehlende_daten_other ?? '',

                    bei_kontur_demontage_zurückzubauende_ausrüstungsgegenstände: `${
                        checkboxTable ?? ''
                    }`,
                    aei: r.textInputTable ?? '',
                    bei: r.checkboxInputTable ?? '',
                };
            });

            const sanitizedArrayCSV = sanitizedArray.map((r: any) => {
                const mainObj: any = {};
                return {
                    ...r,
                    
                    abmessungen_von_rückspringenden_fassadenbereichen_mit_abkantung: `${
                        convert(r.abmessungen_von_rückspringenden_fassadenbereichen_mit_abkantung) ?? ''
                    }`,
                    bei_kontur_demontage_zurückzubauende_ausrüstungsgegenstände: `${
                        convert(r.bei_kontur_demontage_zurückzubauende_ausrüstungsgegenstände) ?? ''
                    }`,
                    
                };
            });

            setData(sanitizedArray);

            setExcelData(sanitizedArrayCSV);
            setShowLoader(false);
        } else {
            setShowLoader(false);
        }
        const isLoggedIn: any = JSON.parse(
            localStorage.getItem('AUHT_USER') ?? ''
        );

        setDataLogin(isLoggedIn?.response?.[0]);
    };
    useEffect(() => {
        (async () => {
            try {
                commonCall();
            } catch (e) {
                alert('can not fetch table data...!');
                console.log('can not fetch table data = ', e);
            }
        })();
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        page,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds, globalFilter },
        preGlobalFilteredRows,
        setGlobalFilter,
        setRowState,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            filterTypes,
        },
        useGlobalFilter,
        useSortBy,
        useBlockLayout,
        useSticky,
        usePagination,
        useRowSelect,
        (hooks: any) => {
            hooks.visibleColumns.push((columns: any) => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    sticky: 'left',
                    width: 60,
                    Header: ({ getToggleAllRowsSelectedProps }: any) => (
                        <div>
                            <IndeterminateCheckbox
                                {...getToggleAllRowsSelectedProps()}
                            />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }: any) => (
                        <Box
                            display={'flex'}
                            justifyContent="center"
                            alignItems={'center'}
                        >
                            <IndeterminateCheckbox
                                {...row.getToggleRowSelectedProps()}
                            />
                        </Box>
                    ),
                },
                ...columns,
            ]);
        }
    );

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [sliderImages, setSliderImages] = useState<any[]>([]);
    const imageClickHandler = (images) => {
        let imageMind4: any = [];
        if (!images) return;
        if (!Array.isArray(images)) {
            imageMind4 = images?.split(', ');
        } else {
            imageMind4 = images;
        }
        if (Array.isArray(imageMind4) && imageMind4.length > 0) {
            setSliderImages(
                imageMind4.map((img) => {
                    return {
                        original: `https://www.c4c-cen.com/api/uploads_sfc/${img}`,
                        thumbnail: `https://www.c4c-cen.com/api/uploads_sfc/${img}`,
                    };
                })
            );
            setIsOpenModal(true);
        }
    };
    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    function convertImageToBase64(imgUrl, callback) {
        return new Promise((resolve) => {
            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx: any = canvas.getContext('2d');
                canvas.height = image.height / 2;
                canvas.width = image.width / 2;
                ctx.scale(0.2, 0.2);

                ctx.drawImage(
                    image,
                    0,
                    0,
                    image.width,
                    image.height,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                const dataUrl = canvas.toDataURL();

                return resolve(dataUrl);
            };
            image.src = imgUrl;
        });
    }

   
    const addFooters = (doc, number) => {
        const pageCount = doc.internal.getNumberOfPages();
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        // This arrangement can be altered based on how we want the date's format to appear.
        let d = `${day}-${month}-${year}`;
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        for (var i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.text('Page ' + String(i) + ' of ' + String(pageCount), 5, 287, {
                align: 'left',
            });
            doc.text(
                'Tankstellen-Nr ' + number,
                doc.internal.pageSize.width / 2,
                287,
                {
                    align: 'left',
                }
            );

            doc.text(
                'Druck Datum ' + d,
                doc.internal.pageSize.width - 10,
                287,
                {
                    align: 'right',
                }
            );
        }
    };

    const exportPdf = async () => {
        setShowButtonLoader(true);
        const doc = new jsPDF('p');
        let key = Object.keys(selectedRowIds);
        let j = 1;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        const img: any = await convertImageToBase64(LOGOS, console.log);
        const image = new Image();
        image.src = img;
        image.height = 60;
        image.width = 60;
        await doc.addImage(LOGOS, 'jpg', 10, 10, 40, 0);

        const imge: any = await convertImageToBase64(LOGO, console.log);
        const imagee = new Image();
        imagee.src = imge;
        imagee.height = 60;
        imagee.width = 60;
        await doc.addImage(LOGO, 'jpg', 180, 3, 0, 25);

        doc.text('ARAL / BP Überprüfung Shop-Fassaden', 55, 18);
        doc.setFontSize(9);
        doc.text(
            'Oberhalb Eingang und Glasfassade von Stationen mit ehemals BPBranding',
            55,
            25
        );
        doc.setLineDashPattern([1, 1.5, 1, 1.5, 1, 1.5, 3, 2, 3, 2, 3, 2], 1);
        doc.line(10, 40, 200, 40);

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Risiko-Abschätzung', 10, 60, { maxWidth: 30 });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(data[key[0]]?.datum, 60, 60, { maxWidth: 30 });

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Installationshöhe', 10, 70, { maxWidth: 30 });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(data[key[0]]?.eingangsbox_vorhanden, 60, 70, { maxWidth: 30 });

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Anzahl Blechlagen', 100, 70, { maxWidth: 40 });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(data[key[0]]?.anzahl_Blech_Lagen_übereinander, 150, 70, {
            maxWidth: 40,
        });

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Visuelle und Funktionale Inspektionen', 10, 80);

        doc.setFont('helvetica', 'bold');
        doc.text('Visueller Erhaltungszustand', 100, 80, { maxWidth: 40 });
        doc.setFont('helvetica', 'normal');
        doc.text(data[key[0]]?.ist_zustand_der_konturbefestigung, 150, 80, {
            maxWidth: 40,
        });

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Montage nach Hersteller-Richtlinie', 10, 90, {
            maxWidth: 30,
        });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(data[key[0]]?.befestigungs_untergrund, 60, 90, {
            maxWidth: 30,
        });

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Monteur', 100, 90, { maxWidth: 40 });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text(data[key[0]]?.name_des_verantwortlichen_monteurs, 150, 90, {
            maxWidth: 40,
        });

        // doc.setFontSize(9);
        // doc.setFont('helvetica', 'bold');
        // doc.text('Ort', 10, 100, { maxWidth: 30 });
        // doc.setFont('helvetica', 'normal');
        // doc.setFontSize(9);
        // doc.text(data[key[0]]?.ort, 60, 100, { maxWidth: 30 });

        // doc.setFontSize(9);
        // doc.setFont('helvetica', 'bold');
        // doc.text('Datum', 100, 100, { maxWidth: 40 });
        // doc.setFont('helvetica', 'normal');
        // doc.setFontSize(9);
        // doc.text(data[key[0]]?.datum, 150, 100, { maxWidth: 40 });

        // doc.setLineDashPattern([1, 1.5, 1, 1.5, 1, 1.5, 3, 2, 3, 2, 3, 2], 1);
        // doc.line(10, 110, 200, 110);

        // doc.setFont('helvetica', 'bold');
        // doc.text('Konturhöhe', 10, 120, { maxWidth: 30 });
        // doc.setFont('helvetica', 'normal');
        // doc.text(data[key[0]]?.höhe_der_kontur, 130, 120, { maxWidth: 30 });

        // doc.setFont('helvetica', 'bold');
        // doc.text('Konturlänge', 100, 120, { maxWidth: 40 });
        // doc.setFont('helvetica', 'normal');
        // doc.text(data[key[0]]?.länge_der_kontur, 150, 120, { maxWidth: 40 });

        // doc.setFont('helvetica', 'bold');
        // doc.text('Maß Rückkantung', 10, 130);
        // doc.setFont('helvetica', 'normal');
        // doc.text(data[key[0]]?.rück_kantung_der_kontur, 60, 130);

        // doc.setFont('helvetica', 'bold');
        // doc.text('Ausrüstungsgegenstände', 10, 140);
        // doc.setFont('helvetica', 'normal');
        // doc.setFontSize(9);

        // doc.setFont('helvetica', 'normal');
        // let keyss: any[] = [' '];
        // const mkeyss = data[key[0]]?.bei?.mcolumns.split('|');
        // keyss = keyss.concat(mkeyss);
        // let valuess: any = data[key[0]]?.bei?.mrows.split('|');
        // let mainValuess: any = [];
        // for (let v of valuess) {
        //     let valKey: any = {
        //         ' ': v,
        //     };
        //     if (data[key[0]]?.bei?.answer[v]?.length > 0) {
        //         const parseData = JSON.parse(data[key[0]]?.bei?.answer[v]);
        //         for (let k: any = 1; k < keyss.length; k++) {
        //             valKey = {
        //                 ...valKey,
        //                 [`${keyss[k]}`]: '-',
        //             };
        //         }
        //         for (let s = 0; s < parseData.length; s++) {
        //             valKey = {
        //                 ...valKey,
        //                 [`${parseData[s]}`]: 'Yes',
        //             };
        //         }
        //     } else {
        //         for (let k: any = 1; k < keyss.length; k++) {
        //             valKey = {
        //                 ...valKey,
        //                 [`${keyss[k]}`]: '-',
        //             };
        //         }
        //     }
        //     mainValuess.push(valKey);
        // }

        // doc.setLineDashPattern([], 190);

        // doc.table(10, 150, mainValuess, keyss, { autoSize: true, fontSize: 6 });

        // doc.setFontSize(9);
        // doc.setFont('helvetica', 'bold');
        // doc.text('Rückspringende Fassaden', 100, 140);
        // doc.setFont('helvetica', 'normal');
        // doc.setFontSize(9);

        // let keys: any[] = [' '];
        // const mkeys = data[key[0]]?.aei?.mcolumns.split('|');
        // keys = keys.concat(mkeys);
        // let values: any = data[key[0]]?.aei?.mrows.split('|');
        // let mainValues: any = [];
        // for (let v of values) {
        //     let valKey: any = {
        //         ' ': v,
        //     };
        //     if (data[key[0]]?.aei?.answer[v]?.length > 0) {
        //         const parseData = JSON.parse(data[key[0]]?.aei?.answer[v]);
        //         for (let k: any = 1; k < keys.length; k++) {
        //             valKey = {
        //                 ...valKey,
        //                 [`${keys[k]}`]: '-',
        //             };
        //         }
        //         for (let s = 0; s < parseData.length; s++) {
        //             valKey = {
        //                 ...valKey,
        //                 [`${mkeys[s]}`]:
        //                     parseData[s] != '' ? parseData[s] : '-',
        //             };
        //         }
        //     } else {
        //         for (let k: any = 1; k < keys.length; k++) {
        //             valKey = {
        //                 ...valKey,
        //                 [`${keys[k]}`]: '0',
        //             };
        //         }
        //     }
        //     mainValues.push(valKey);
        // }

        // doc.table(100, 150, mainValues, keys, { autoSize: true, fontSize: 6 });

        // //  doc.setFontSize(9);
        // // doc.setFont('helvetica', 'bold');
        // // doc.text('Unterschrift', 10, 50);
        // // doc.setFont('helvetica', 'normal');
        // // doc.setFontSize(9);
        // // doc.textWithLink(data[key[0]]?.unterschrift, 130, 50, {
        // //     URL: data[key[0]]?.unterschrift,
        // // });

        // // j = 0;
        // // const unterschrift =
        // //     data[key[0]].mind_4_Fotos_der_Fassadenbereiche_umlaufend?.split(
        // //         '/n'
        // //     );
        // // for (let i of unterschrift) {
        // //     const img: any = await convertImageToBase64(i, console.log);
        // //     const image = new Image();

        // //     image.src = img;
        // //     image.height = 100;
        // //     image.width = 100;
        // //     await doc.addImage(image, 'jpeg', 130, 10 + j * 75, 100, 100);
        // //     break;
        // // }

        // doc.addPage();

        // doc.setFontSize(9);
        // doc.setFont('helvetica', 'bold');
        // doc.text('Eingangsbox Vvorhanden', 10, 10);
        // doc.setFont('helvetica', 'normal');
        // doc.setFontSize(9);
        // doc.text(data[key[0]]?.eingangsbox_vorhanden, 130, 10);

        // doc.setFontSize(9);
        // doc.setFont('helvetica', 'bold');
        // doc.text('Anzahl Blechlagen', 10, 20);
        // doc.setFont('helvetica', 'normal');
        // doc.setFontSize(9);
        // doc.text(data[key[0]]?.anzahl_Blech_Lagen_übereinander, 130, 20);

        // doc.setFontSize(9);
        // doc.setFont('helvetica', 'bold');
        // doc.text('IST-Zustand der Konturbefestigung', 10, 30);
        // doc.setFont('helvetica', 'normal');
        // doc.setFontSize(9);
        // doc.text(data[key[0]]?.ist_zustand_der_konturbefestigung, 130, 30);

        // doc.setFontSize(9);
        // doc.setFont('helvetica', 'bold');
        // doc.text('Befestigungs-Untergrund', 10, 40);
        // doc.setFont('helvetica', 'normal');
        // doc.setFontSize(9);
        // doc.text(data[key[0]]?.befestigungs_untergrund, 130, 40);

        // doc.setFontSize(9);
        // doc.setFont('helvetica', 'bold');
        // doc.text('Bemerkungen', 10, 50);
        // doc.setFont('helvetica', 'normal');
        // doc.setFontSize(9);
        // doc.text(data[key[0]]?.sonstige_bemerkungen, 130, 50);

        // // doc.setFontSize(9);
        // // doc.setFont('helvetica', 'bold');
        // // doc.text('Insp-Nr', 10, 210);
        // // doc.setFont('helvetica', 'normal');
        // // doc.setFontSize(9);
        // // doc.text(data[key[0]]?.insp_nr, 130, 210);

        // // doc.setFontSize(9);
        // // doc.setFont('helvetica', 'bold');
        // // doc.text('ID', 10, 220);
        // // doc.setFont('helvetica', 'normal');
        // // doc.setFontSize(9);
        // // doc.text(data[key[0]]?.id, 130, 220);

        // // doc.setFontSize(9);
        // // doc.setFont('helvetica', 'bold');
        // // doc.text('Datensatz geprüft', 10, 230);
        // // doc.setFont('helvetica', 'normal');
        // // doc.setFontSize(9);
        // // doc.text(data[key[0]]?.datensatz_geprüft, 130, 230);

        // // doc.setFontSize(9);
        // // doc.setFont('helvetica', 'bold');
        // // doc.text('Freigabe Fertigung', 10, 240);
        // // doc.setFont('helvetica', 'normal');
        // // doc.setFontSize(9);
        // // doc.text(data[key[0]]?.freigabe_fertigung, 130, 240);

        // // doc.setFontSize(9);
        // // doc.setFont('helvetica', 'bold');
        // // doc.text('Projekt Abschluss', 10, 250);
        // // doc.setFont('helvetica', 'normal');
        // // doc.setFontSize(9);
        // // doc.text(data[key[0]]?.projekt_abschluss, 130, 250);

        // doc.setFontSize(9);
        // doc.setFont('helvetica', 'bold');
        // doc.text('Aufmaß-Skizze bitte hier hochladen', 10, 60);
        // doc.setFont('helvetica', 'normal');
        // doc.setFontSize(9);

        // for (let i of data[key[0]]?.aufmaß_skizze_bitte_hier_hochladen) {
        //     const img: any = await convertImageToBase64Paper(i, console.log);
        //     const image = new Image();
        //     image.src = img;
        //     image.height = 150;
        //     image.width = 150;
        //     await doc.addImage(image, 'jpeg', 130, 60, 300, 300);
        // }

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Mind. 4 Fotos der Fassadenbereiche umlaufend', 10, 120);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        j = 0;
        const images =
            data[key[0]].mind_4_Fotos_der_Fassadenbereiche_umlaufend?.split(
                ', '
            );
        let m = 0;
        for (let i of images) {
            if ((j % 6 == 0 && j != 0 && m > 1) || m == 2) {
                doc.addPage();
                j = 0;
            }

            let img: any = await convertImageToBase64(
                `https://www.c4c-cen.com/api/uploads_sfc/${i}`,
                console.log
            );

            const image = new Image();

            image.src = img;
            image.height = 100;
            image.width = 100;
            let heightCal = j;
            if (m < 2) {
                heightCal = 120;
            } else if (j % 2 === 0) {
                heightCal = j * 48;
            } else {
                heightCal = (j - 1) * 48;
            }
            m = m + 1;
            if (j % 2 === 0) {
                await doc.addImage(image, 'jpeg', 10, 10 + heightCal, 400, 400);
            } else {
                await doc.addImage(
                    image,
                    'jpeg',
                    120,
                    10 + heightCal,
                    400,
                    400
                );
            }
            j++;
        }
        addFooters(doc, data[key[0]]?.geben_sie_die_tankstellennummer_ein);
        await doc.save('shop_fassden_check-new.pdf');

        setShowButtonLoader(false);
    };

    const options = [
        'wie "Ettlingen"',
        'wie "offensichtlich"',
        'wie "unklar"',
        'kein',
    ];

    const [value, setValue] = useState<string | null>(options[0]);
    const [inputValue, setInputValue] = useState('');

    const options1 = [
        '1 Shop',
        '1 Shop + Waschhalle',
        '1 Shop+Waschhalle 2 seiten',
        '1 Shop+Waschhalle 3 seiten oder mehr',
        'Waschhalle',
    ];

    const [value1, setValue1] = useState<string | null>(options1[0]);
    const [inputValue1, setInputValue1] = useState('');

    const options2 = ['uneigeschränkt', 'eingeschränkt', 'nein', 'Klärung'];

    const [value2, setValue2] = useState<string | null>(options2[0]);
    const [inputValue2, setInputValue2] = useState('');

    const options3 = [
        'offen',
        'geschlossen',
        'teilweise geschlossen',
        'Mängel vorh',
    ];

    const [value3, setValue3] = useState<string | null>(options3[0]);
    const [inputValue3, setInputValue3] = useState('');

    const options4 = ['Ja', 'Nein', 'Rücksprache'];

    const [value4, setValue4] = useState<string | null>(options4[0]);
    const [inputValue4, setInputValue4] = useState('');

    const [checkbox, setCheckbox] = useState<any>({
        Waschhalle_Einfahrt: false,
        Waschhalle_Ausfahrt: false,
        Waschhalle_Längswand: false,
        Shop_Eingangsfassade: false,
        Other: false,
    });

    const [geplate, setgePlate] = useState<any>('');
    const [geplateM, setgePlateM] = useState<any>('');
    const [istFe, setIstFe] = useState<any>('');
    const [istMo, setIstMo] = useState<any>('');
    const [otherCheck, setOtherCheck] = useState<string>('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckbox({
            ...checkbox,
            [event.target.name]: event.target.checked,
        });
    };
    const [otherText, setOtherText] = useState<any>('');
    const [textFieldAll, setTextFieldAll] = useState<any>({
        vorhanden: '',
        austausch: '',
        cluster: '',
        freigabe: '',
        abschluss: '',
        gepruft: '',
        fehlende: [],
        geplante: '',
        montage: '',
        istferigung: '',
        istmontage: '',
        hohe: '',
        langeder: '',
        ruckkantung: '',
        fehlende_daten_other: '',
    });

    const dataEditModal = () => {
        let key: any = Object.keys(selectedRowIds) ?? '';
        setValue(
            data[key].handlungsbedarf_vorhanden
                ? data[key].handlungsbedarf_vorhanden
                : options[0]
        );
        setInputValue(
            data[key].handlungsbedarf_vorhanden
                ? data[key].handlungsbedarf_vorhanden
                : ''
        );

        setValue1(data[key].cluster ? data[key].cluster : options1[0]);
        setInputValue1(data[key].cluster ? data[key].cluster : options1[0]);

        setValue2(
            data[key].freigabe_fertigung
                ? data[key].freigabe_fertigung
                : options2[0]
        );
        setInputValue2(
            data[key].freigabe_fertigung ? data[key].freigabe_fertigung : ''
        );

        setValue3(
            data[key].projekt_abschluss
                ? data[key].projekt_abschluss
                : options3[0]
        );
        setInputValue3(
            data[key].projekt_abschluss ? data[key].projekt_abschluss : ''
        );

        setValue4(
            data[key].datensatz_geprüft
                ? data[key].datensatz_geprüft
                : options4[0]
        );
        setInputValue4(
            data[key].datensatz_geprüft ? data[key].datensatz_geprüft : ''
        );

        setgePlate(dayjs(`${data[key].geplante_fertigung}`, 'MM-DD-YYYY'));
        setgePlateM(dayjs(`${data[key].geplante_montage}`, 'MM-DD-YYYY'));

        setIstFe(dayjs(`${data[key].ist_ferigung}`, 'MM-DD-YYYY'));
        setIstMo(dayjs(`${data[key].ist_montage}`, 'MM-DD-YYYY'));
        const mainDataCheckbox = data[key]?.fehlende_daten?.split(',');

        if (mainDataCheckbox && mainDataCheckbox.length > 0) {
            const check = {
                Waschhalle_Einfahrt:
                    mainDataCheckbox.includes(`Waschhalle Einfahrt`),
                Waschhalle_Ausfahrt:
                    mainDataCheckbox.includes(`Waschhalle Ausfahrt`),
                Waschhalle_Längswand:
                    mainDataCheckbox.includes(`Waschhalle Längswand`),
                Shop_Eingangsfassade:
                    mainDataCheckbox.includes(`Shop-Eingangsfassade`),
                Other: mainDataCheckbox.includes(`Other`),
            };
            if (mainDataCheckbox.includes(`Other`)) {
                setOtherText(data[key]?.fehlende_daten_other ?? '');
            }
            setCheckbox(check);
        }
        setTextFieldAll({
            ...textFieldAll,
            vorhanden:
                data[key].handlungsbedarf_vorhanden == 'null'
                    ? 'Select option'
                    : data[key].handlungsbedarf_vorhanden,
            austausch: data[key].gesamtlänge_kontur_austausch,
            cluster: data[key].cluster,
            freigabe: data[key].freigabe_fertigung,
            abschluss: data[key].projekt_abschluss,
            gepruft: data[key].datensatz_geprüft,
            fehlende: data[key].fehlende ?? [],
            geplante: data[key].geplante_fertigung,
            montage: data[key].geplante_montage,
            istferigung: data[key].ist_ferigung,
            istmontage: data[key].ist_montage,
            hohe: data[key].höhe_der_kontur,
            langeder: data[key].länge_der_kontur,
            ruckkantung: data[key].rück_kantung_der_kontur,
            other_text: data[key].fehlende_daten_other,
        });
        setIsOpenEditModal(true);
    };

    const onSubmit = async (e: any, values: any) => {
        let key: any = Object.keys(selectedRowIds);
        key = key ? key : 0;
        const datsa: any = new FormData(e.target);
        const formProps: any = Object.fromEntries(datsa);
        console.log(formProps);
        e.preventDefault();
        let arrayFeh: any = [];
        formProps.Waschhalle_Einfahrt == 'on'
            ? arrayFeh.push('Waschhalle Einfahrt')
            : '';
        formProps.Waschhalle_Ausfahrt == 'on'
            ? arrayFeh.push('Waschhalle Ausfahrt')
            : '';
        formProps.Waschhalle_Längswan == 'on'
            ? arrayFeh.push('Waschhalle Längswan')
            : '';
        formProps.Shop_Eingangsfassade == 'on'
            ? arrayFeh.push('Shop-Eingangsfassade')
            : '';
        formProps.Other == 'on' ? arrayFeh.push('Other') : '';
        formProps.other_text =
            formProps.Other == 'on' ? formProps.other_text : '';
        const value: any = {
            vorhanden: formProps.vorhanden,
            austausch: formProps.austausch,
            cluster: formProps.cluster,
            freigabe: formProps.freigabe,
            abschluss: formProps.abschluss,
            gepruft: formProps.gepruft,
            fehlende: arrayFeh,
            geplante:
                dayjs(geplate).format('MM/DD/YYYY') !== 'Invalid Date'
                    ? dayjs(geplate).format('MM/DD/YYYY')
                    : '',
            montage:
                dayjs(geplateM).format('MM/DD/YYYY') !== 'Invalid Date'
                    ? dayjs(geplateM).format('MM/DD/YYYY')
                    : '',
            istferigung:
                dayjs(istFe).format('MM/DD/YYYY') !== 'Invalid Date'
                    ? dayjs(istFe).format('MM/DD/YYYY')
                    : '',
            istmontage:
                dayjs(istMo).format('MM/DD/YYYY') !== 'Invalid Date'
                    ? dayjs(istMo).format('MM/DD/YYYY')
                    : '',
            hohe: formProps.hohe,
            langeder: formProps.langeder,
            ruckkantung: formProps.ruckkantung,
            form_id: data[key].form_id,
            fehlende_daten_other: formProps.other_text,
        };

        const params = new URLSearchParams();
        const valuekey: any = Object.keys(value);
        const valueObj: any = Object.values(value);
        for (let i = 0; i < valuekey.length; i++) {
            params.append(`${valuekey[i]}`, `${valueObj[i]}`);
        }
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const datas: any = await axios.post(`/api_formupdate_sfc`, params, {
            headers: headers,
        });
        await commonCall();
        setIsOpenEditModal(false);
    };

    const {
        Waschhalle_Einfahrt,
        Waschhalle_Ausfahrt,
        Waschhalle_Längswand,
        Shop_Eingangsfassade,
        Other,
    } = checkbox;

    return (
        <Grid container rowSpacing={1}>
            {!showLoader && (
                <>
                    <Dialog
                        open={isOpenModal}
                        fullScreen={fullScreen}
                        onClose={() => setIsOpenModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <>
                            <Box>
                                <DialogActions>
                                    <IconButton
                                    // className={classes.customizedButton}
                                    >
                                        <CloseIcon
                                            onClick={() =>
                                                setIsOpenModal(false)
                                            }
                                        />
                                    </IconButton>
                                </DialogActions>
                                <ImageGallery items={sliderImages} />
                            </Box>
                        </>
                    </Dialog>

                    <Box
                        display={'flex'}
                        alignItems="center"
                        my={2}
                        sx={{ justifyContent: 'space-around' }}
                    >
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                        {selectedFlatRows.length !== 0 && (
                            <Button
                                variant="contained"
                                color="info"
                                sx={{ mx: 2 }}
                                onClick={() => {
                                    setRowState(
                                        rows.map((row: any) => ({
                                            ...row,
                                            isSelected: false,
                                        }))
                                    );
                                }}
                            >
                                {selectedFlatRows.length} entry selected
                            </Button>
                        )}
                        {dataLogin?.loginType === 'admin' && (
                            <Button
                                variant="contained"
                                sx={{ padding: 1, marginLeft: 1 }}
                            >
                                <CsvDownload
                                    datas={data}
                                    columns={csvColumn}
                                    filename={'shop_facade_check.csv'}
                                    className="btn btn-primary"
                                    // target="_blank"
                                >
                                    <Typography
                                        sx={{
                                            color: '#FFF',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Download Excel
                                    </Typography>
                                </CsvDownload>
                            </Button>
                        )}
                        {selectedFlatRows.length === 1 && (
                            <Button
                                variant="contained"
                                sx={{ padding: 1, marginLeft: 1 }}
                                onClick={() => exportPdf()}
                                disabled={showButtonLoader}
                            >
                                <Typography
                                    sx={{
                                        color: '#FFF',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {showButtonLoader
                                        ? `In Progress`
                                        : `Download Pdf`}
                                </Typography>
                            </Button>
                        )}

                        {selectedFlatRows.length === 1 &&
                            dataLogin?.loginType === 'admin' && (
                                <Button
                                    variant="contained"
                                    sx={{ padding: 1, marginLeft: 1 }}
                                    onClick={() => dataEditModal()}
                                    disabled={showButtonLoader}
                                >
                                    <Typography
                                        sx={{
                                            color: '#FFF',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Edit
                                    </Typography>
                                </Button>
                            )}

                        {selectedFlatRows.length !== 0 && false && (
                            <Button
                                variant="outlined"
                                color="error"
                                sx={{ mx: 2 }}
                                onClick={() => setIsOpenDeleteModal(true)}
                            >
                                <DeleteRoundedIcon color="error" /> Delete
                            </Button>
                        )}
                    </Box>

                    <Grid xs={12} item>
                        <Styles>
                            <div
                                {...getTableProps()}
                                className="table sticky"
                                // style={{ height: 450 }}
                            >
                                <div className="header">
                                    {headerGroups.map((headerGroup: any) => (
                                        <div
                                            {...headerGroup.getHeaderGroupProps()}
                                            className="tr"
                                        >
                                            {headerGroup.headers.map(
                                                (column: any) => {
                                                    return (
                                                        <div
                                                            {...column.getHeaderProps(
                                                                column.getSortByToggleProps()
                                                            )}
                                                            className="th"
                                                        >
                                                            <Box
                                                                display="flex"
                                                                alignItems={
                                                                    'center'
                                                                }
                                                            >
                                                                {
                                                                    column?.headerIcon
                                                                }
                                                                <Typography
                                                                    variant="button"
                                                                    paddingLeft={
                                                                        1
                                                                    }
                                                                >
                                                                    {' '}
                                                                    {column.render(
                                                                        'Header'
                                                                    )}
                                                                </Typography>
                                                                <span>
                                                                    {column.isSorted ? (
                                                                        column.isSortedDesc ? (
                                                                            <ExpandMoreIcon
                                                                                fontSize="medium"
                                                                                sx={{
                                                                                    color: COLOR_CODES.darkGrey,
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <ExpandLessIcon
                                                                                fontSize="medium"
                                                                                sx={{
                                                                                    color: COLOR_CODES.darkGrey,
                                                                                }}
                                                                            />
                                                                        )
                                                                    ) : (
                                                                        // <UnfoldMoreIcon
                                                                        //     fontSize="medium"
                                                                        // sx={{
                                                                        //     color: COLOR_CODES.darkGrey,
                                                                        // }}
                                                                        // />
                                                                        ''
                                                                    )}
                                                                </span>
                                                            </Box>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div {...getTableBodyProps()} className="body">
                                    {page?.map((row: any) => {
                                        prepareRow(row);
                                        return (
                                            <div
                                                {...row.getRowProps()}
                                                className="tr"
                                            >
                                                {row.cells.map((cell: any) => {
                                                    if (
                                                        IMAGE_COLUMN_NAMES.includes(
                                                            cell.column.id
                                                        )
                                                    ) {
                                                        return (
                                                            <div
                                                                {...cell.getCellProps()}
                                                                className="td"
                                                                onClick={() => {
                                                                    imageClickHandler(
                                                                        cell?.value
                                                                    );
                                                                }}
                                                            >
                                                                {cell.render(
                                                                    'Cell'
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <div
                                                            {...cell.getCellProps()}
                                                            className="td"
                                                        >
                                                            <Typography variant="body2">
                                                                {cell.render(
                                                                    'Cell'
                                                                )}
                                                            </Typography>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                mt={2}
                            >
                                <NativeSelect
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                    }}
                                    // size="small"
                                    sx={{
                                        height: '30px',
                                    }}
                                >
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <option key={pageSize} value={pageSize}>
                                            Rows {pageSize}
                                        </option>
                                    ))}
                                </NativeSelect>
                                <IconButton
                                    onClick={() => gotoPage(0)}
                                    disabled={!canPreviousPage}
                                    aria-label="Go TO Previous Page"
                                    color="primary"
                                >
                                    <SkipPreviousIcon fontSize="large" />
                                </IconButton>
                                <IconButton
                                    onClick={() => previousPage()}
                                    disabled={!canPreviousPage}
                                    aria-label="Previous Page"
                                    color="primary"
                                >
                                    <ArrowBackIosRounded fontSize="small" />
                                </IconButton>
                                <span>
                                    {pageIndex + 1} of {pageOptions?.length}
                                </span>
                                <IconButton
                                    onClick={() => nextPage()}
                                    disabled={!canNextPage}
                                    aria-label="Next Page"
                                    color="primary"
                                >
                                    <ArrowForwardIosRounded fontSize="small" />
                                </IconButton>
                                <IconButton
                                    onClick={() => gotoPage(pageCount - 1)}
                                    disabled={!canNextPage}
                                    aria-label="Go To Next Page"
                                    color="primary"
                                >
                                    <SkipNextRounded fontSize="large" />
                                </IconButton>
                                {/* <span>
                                | Go to page:{' '}
                                <input
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value
                                    ? Number(e.target.value) - 1
                                    : 0;
                                    gotoPage(page);
                                }}
                                style={{ width: '100px' }}
                                />
                            </span>{' '} */}
                            </Box>
                        </Styles>
                    </Grid>

                    <Modal
                        open={isOpenDeleteModal}
                        onClose={() => setIsOpenDeleteModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                background: COLOR_CODES.white,
                                height: 170,
                                width: 400,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5,
                            }}
                        >
                            <DeleteRoundedIcon fontSize="large" color="error" />
                            <Typography variant="body1" pt={1}>
                                Are you sure, you want to Delete{' '}
                                {selectedFlatRows.length} rows?
                            </Typography>
                            <Box
                                mt={2}
                                display={'flex'}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Button
                                    variant="contained"
                                    color="info"
                                    onClick={() => setIsOpenDeleteModal(false)}
                                    sx={{ mx: 1 }}
                                >
                                    No
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setIsOpenDeleteModal(false);
                                    }}
                                    sx={{ mx: 1 }}
                                >
                                    Yes
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </>
            )}

            <Modal
                open={isOpenEditModal}
                onClose={() => setIsOpenEditModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    justifyContent: 'center',
                    overflow: 'scroll',
                    width: 400,
                    left: '30%',
                }}
            >
                <Box
                    sx={{
                        background: COLOR_CODES.white,
                    }}
                >
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 2 },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => onSubmit(e, '')}
                    >
                        <div>
                            <Autocomplete
                                value={value}
                                onChange={(
                                    event: any,
                                    newValue: string | null
                                ) => {
                                    setValue(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                key="controllable-states-demo"
                                options={options}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Handlungsbedarf vorhanden"
                                        name="vorhanden"
                                    />
                                )}
                            />
                            <TextField
                                label="Gesamtlänge Kontur-Austausch"
                                id="outlined-size-smal=1l"
                                defaultValue={textFieldAll.austausch}
                                size="small"
                                name="austausch"
                            />
                            <Autocomplete
                                value={value1}
                                onChange={(
                                    event: any,
                                    newValue: string | null
                                ) => {
                                    setValue1(newValue);
                                }}
                                inputValue={inputValue1}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue1(newInputValue);
                                }}
                                id="controllable-states-demo-1"
                                options={options1}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Cluster"
                                        name="cluster"
                                    />
                                )}
                            />
                            <Autocomplete
                                value={value2}
                                onChange={(
                                    event: any,
                                    newValue: string | null
                                ) => {
                                    setValue2(newValue);
                                }}
                                inputValue={inputValue2}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue2(newInputValue);
                                }}
                                id="controllable-states-demo-2"
                                options={options2}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Freigabe Fertigung"
                                        name="freigabe"
                                    />
                                )}
                            />
                            <Autocomplete
                                value={value3}
                                onChange={(
                                    event: any,
                                    newValue: string | null
                                ) => {
                                    setValue3(newValue);
                                }}
                                inputValue={inputValue3}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue3(newInputValue);
                                }}
                                id="controllable-states-demo-2"
                                options={options3}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Projekt-Abschluss"
                                        name="abschluss"
                                    />
                                )}
                            />

                            <Autocomplete
                                value={value4}
                                onChange={(
                                    event: any,
                                    newValue: string | null
                                ) => {
                                    setValue4(newValue);
                                }}
                                inputValue={inputValue4}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue4(newInputValue);
                                }}
                                id="controllable-states-demo-3"
                                options={options4}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Datensatz geprüft"
                                        name="gepruft"
                                    />
                                )}
                            />
                            <Box sx={{ display: 'flex' }}>
                                <FormControl
                                    sx={{ m: 3 }}
                                    component="fieldset"
                                    variant="standard"
                                >
                                    <FormLabel component="legend">
                                        Fehlende Daten
                                    </FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        Waschhalle_Einfahrt
                                                    }
                                                    onChange={handleChange}
                                                    name="Waschhalle_Einfahrt"
                                                />
                                            }
                                            label="Waschhalle Einfahrt"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        Waschhalle_Ausfahrt
                                                    }
                                                    onChange={handleChange}
                                                    name="Waschhalle_Ausfahrt"
                                                />
                                            }
                                            label="Waschhalle Ausfahrt"
                                        />

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        Waschhalle_Längswand
                                                    }
                                                    onChange={handleChange}
                                                    name="Waschhalle_Längswand"
                                                />
                                            }
                                            label="Waschhalle Längswand"
                                        />

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        Shop_Eingangsfassade
                                                    }
                                                    onChange={handleChange}
                                                    name="Shop_Eingangsfassade"
                                                />
                                            }
                                            label="Shop Eingangsfassade"
                                        />

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={Other}
                                                    onChange={handleChange}
                                                    name="Other"
                                                />
                                            }
                                            label="Other"
                                        />
                                        {Other && (
                                            <TextField
                                                label="Other"
                                                id="outlined-size-small-3"
                                                defaultValue={
                                                    textFieldAll.fehlende_daten_other
                                                }
                                                size="small"
                                                placeholder="Other"
                                                name="other_text"
                                            />
                                        )}
                                    </FormGroup>
                                </FormControl>
                            </Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="geplante Fertigung"
                                    value={geplate}
                                    onChange={(newValue) =>
                                        setgePlate(newValue)
                                    }
                                />
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="geplante Montage"
                                    value={geplateM}
                                    onChange={(newValue) =>
                                        setgePlateM(newValue)
                                    }
                                />
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="IST-Ferigung"
                                    value={istFe}
                                    onChange={(newValue) => setIstFe(newValue)}
                                />
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="IST-Montage"
                                    value={istMo}
                                    onChange={(newValue) => setIstMo(newValue)}
                                />
                            </LocalizationProvider>
                            <TextField
                                label="Höhe der Kontur"
                                id="outlined-size-small-1"
                                defaultValue={textFieldAll.hohe}
                                size="small"
                                placeholder="Höhe der Kontur"
                                name="hohe"
                            />

                            <TextField
                                label="Länge der Kontur"
                                id="outlined-size-small-2"
                                defaultValue={textFieldAll.langeder}
                                size="small"
                                placeholder="Länge der Kontur"
                                name="langeder"
                            />

                            <TextField
                                label="Rück-Kantung der Kontur "
                                id="outlined-size-small-3"
                                defaultValue={textFieldAll.ruckkantung}
                                size="small"
                                placeholder="Rück-Kantung der Kontur "
                                name="ruckkantung"
                            />
                            <Box
                                mt={2}
                                mb={2}
                                display={'flex'}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Button
                                    variant="contained"
                                    color="info"
                                    onClick={() => setIsOpenEditModal(false)}
                                    sx={{ mx: 1 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    type="submit"
                                    sx={{ mx: 1 }}
                                >
                                    Update
                                </Button>
                            </Box>
                        </div>
                    </Box>
                </Box>
            </Modal>

            {showLoader && (
                <Box
                    my={2}
                    display={'flex'}
                    justifyContent="center"
                    alignItems={'center'}
                    sx={{
                        background: COLOR_CODES.tableBgColor,
                        width: '100%',
                        height: '430px',
                    }}
                >
                    <CircularProgress
                        size={50}
                        sx={{
                            color: COLOR_CODES.tabBtnColor,
                        }}
                    />
                </Box>
            )}
        </Grid>
    );
};
