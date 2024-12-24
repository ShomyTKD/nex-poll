import { FC, useEffect, useState } from 'react';
import classes from './Admin.module.css';
import { DEFAULT_THEME, Container, Box, Title, Text, TextInput, Button, Select, ActionIcon, Divider } from '@mantine/core';
import { IconX, IconPlus } from '@tabler/icons-react';
import { TriggerNuiCallback } from '../Utils/TriggerNuiCallback';

export const Admin: FC = () => {
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<string | null>('');
    const [optionValues, setOptionValues] = useState<string[]>([]);
    const [optionFieldCount, setOptionFieldsCount] = useState<number>(0);

    const handleNewOption = () => {
        if (optionFieldCount >= 8) return;
        setOptionValues([...optionValues, '']);
        setOptionFieldsCount(optionFieldCount + 1);
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = optionValues.filter((_, i) => i !== index);
        setOptionValues(newOptions);
        setOptionFieldsCount(optionFieldCount - 1);
    };

    const handleFormSubmit = () => {
        if (!title || !type || optionValues.some((value) => !value)) return;
        if (optionValues.length < 2) return;

        const pollData = {
            title,
            type,
            options: optionValues.map((option) => ({ value: option, count: 0 })),
        };
        TriggerNuiCallback('createPoll', pollData);
    };

    useEffect(() => {
        if (optionFieldCount < 1) {
            handleNewOption();
        }
    }, []);

    return (
        <Container className={classes.main_container}>
            <Box className={classes.box_container} bg={DEFAULT_THEME.colors.dark[9]}>
                <Title c={DEFAULT_THEME.colors.gray[0]} order={1} align='center'>Create a Poll</Title>
                <Text c={DEFAULT_THEME.colors.gray[5]} size='sm'>Complete the below fields to create your poll.</Text>
                <Box className={classes.inner_container}>
                    <TextInput
                        label="Title"
                        placeholder="Type your question here"
                        value={title}
                        onChange={(event) => setTitle(event.currentTarget.value)}
                    />
                    <Select
                        label="Poll type"
                        placeholder="Pick a type"
                        value={type}
                        onChange={setType}
                        data={['Single Choice', 'Multiple Choice']}
                    />
                    <Box className={classes.options_container}>
                        {optionValues.map((value, i) => (
                            <Box key={i} className={classes.options_input_field}>
                                <TextInput
                                    label={i === 0 ? "Answer Options" : undefined}
                                    placeholder={`Option ${i + 1}`}
                                    value={value}
                                    onChange={(e) => {
                                        const newOptions = [...optionValues];
                                        newOptions[i] = e.currentTarget.value;
                                        setOptionValues(newOptions);
                                    }}
                                />
                                {optionFieldCount > 1 && (
                                    <ActionIcon
                                        className={classes.icon}
                                        variant="subtle"
                                        color="gray"
                                        aria-label="RemoveOption"
                                        onClick={() => handleRemoveOption(i)}
                                    >
                                        <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                    </ActionIcon>
                                )}
                            </Box>
                        ))}

                        <Button
                            leftIcon={<IconPlus size={14} />}
                            className={classes.add_option_btn}
                            variant="filled"
                            onClick={handleNewOption}
                            disabled={optionFieldCount >= 8}
                        >
                            Add option
                        </Button>
                    </Box>
                </Box>
                <Divider style={{ width: '100%' }} my="md" />
                <Button variant='filled' onClick={handleFormSubmit}>Create poll</Button>
            </Box>
        </Container >
    );
};