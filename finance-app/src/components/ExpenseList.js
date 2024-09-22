import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridActionsCellItem,
  } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import CreateExpenseButton from "./CreateExpenseButton";
import TagsEditor from './TagsEditor';
import { deleteExpense, updateExpense, updateExpenseTags, updateExpensePrimaryTag } from "../firebaseHelpers/firestoreHelper"

export default function ExpenseList({ desiredColumns, expenses, refreshExpenses }) {
    const columns = [
        {
            field: 'name',
            headerName: 'Expense',
            editable: true,
            flex:1,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            editable: true,
            type: 'number',
            width: 80,
        },
        {
            field: 'split',
            headerName: 'Split',
            editable: true,
            type: 'number',
            width: 50,
        },
        {
            field: 'date',
            headerName: 'Date',
            editable: true,
            type: 'date',
            valueGetter: (params) => (new Date(params.value.seconds * 1000))
        },
        {
            field: 'primaryTag',
            headerName: 'Primary Tag',
            editable: false,
            width: 100,
            renderCell: (params) => (
                <Chip label={params.value} style={{ margin: '4px' }}/>
            )
        },
        {
            field: 'tags',
            headerName: 'Tags',
            editable: false,
            flex:1,
            renderCell: (params) => (
                <div>
                    {params.value.map((tag, index) => (
                        <Chip label={tag} key={index} style={{ margin: '4px' }}/>
                    ))}
                </div>
            )
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex:1,
            cellClassName: 'actions',
            getActions: ({ id }) => {
              return [
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={() => handleDeleteRow(id)}
                  color="inherit"
                />,
              ];
            },
          },
      ].filter((col) => desiredColumns ? desiredColumns.has(col.field) : true);
    
    const [snackbar, setSnackbar] = React.useState(null);
    const [tagsEdited, setTagsEdited] = React.useState(null);
    const [selectedPrimaryTag, setPrimaryTag] = React.useState(null);
    const [idClicked, setIdClicked] = React.useState(null)

    const handleCloseSnackbar = () => setSnackbar(null);

    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    const processRowUpdate = React.useCallback(
        async (newRow) => {
            updateExpense(newRow)
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
        },
        [updateExpense]
    );

    const handleDeleteRow = (id) => {
        deleteExpense(id)
            .then(
                refreshExpenses()
            )
    }

    const handleRowDoubleClick = (params) => {
        console.log("double click params: ", params)
        if (params.field == "tags" || params.field == "primaryTag") {
            setIdClicked(params.id)
            setTagsEdited([...params.row.tags, params.row.primaryTag])
            setPrimaryTag(params.row.primaryTag)
        }
    }

    const saveTags = () => {
        updateExpenseTags(idClicked, tagsEdited.filter(tag => tag != selectedPrimaryTag))
        updateExpensePrimaryTag(idClicked, selectedPrimaryTag)
        setTagsEdited(null)
        setIdClicked(null)
        refreshExpenses()
    }

    useEffect(() => {
        refreshExpenses()
    }, [])

    return (
        <Box>
            <Dialog onClose={saveTags} open={tagsEdited != null} >
                <DialogTitle>Edit Tags</DialogTitle>
                <Box sx={{ height: 150, width: 400, padding: "30px"}}>
                    <TagsEditor tags={tagsEdited} onTagsUpdated={setTagsEdited} primaryTag={selectedPrimaryTag} setPrimaryTag={setPrimaryTag}/>
                </Box>
            </Dialog>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={expenses}
                    columns={columns}
                    editMode="row"
                    autoHeight
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    slots={{
                        toolbar: CreateExpenseButton,
                    }}
                    slotProps={{
                        toolbar: { refreshExpenses },
                    }}
                    onCellDoubleClick={handleRowDoubleClick}
                />
                {!!snackbar && (
                    <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                    >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                    </Snackbar>
                )}
            </Box>
        </Box>
    )
}