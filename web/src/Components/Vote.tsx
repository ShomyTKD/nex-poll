import { FC, useState } from 'react';
import classes from './Vote.module.css';
import { DEFAULT_THEME, Container, Box, Title, Text, Button, Checkbox, Radio } from '@mantine/core';
import { HandleNuiMessage } from '../Hooks/HandleNuiMessage';
import { TriggerNuiCallback } from '../Utils/TriggerNuiCallback';

interface PollData {
    title: string;
    type: string;
    options: Option[];
}

interface Option {
    value: string;
    count: number;
}

export const Vote: FC = () => {
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<string | null>('');
    const [optionValues, setOptionValues] = useState<Option[]>([]);
    const [selectedValues, setSelectedValues] = useState<Option['value'][]>([]);
    const [voted, setVoted] = useState<boolean>(false);

    const getPollData = () => {
        TriggerNuiCallback<PollData>('getPollData').then((data) => {
            if (data) {
                setTitle(data.title);
                setType(data.type);
                setOptionValues(data.options);
            }
        }).catch((error) => {
            console.error('Error fetching poll data:', error);
        })
    };

    HandleNuiMessage<any>('setVisibleVote', () => {
        getPollData();
    });

    const handleVoteSubmit = () => {
        if (!selectedValues.length) return;
        TriggerNuiCallback('registerVote', selectedValues);
        setVoted(true);
    };

    return (
        <Container className={classes.main_container}>
            <Box className={classes.box_container} bg={DEFAULT_THEME.colors.dark[9]}>
                <Title c={DEFAULT_THEME.colors.gray[0]} order={1} align='center'>{title}</Title>
                <Text c={DEFAULT_THEME.colors.gray[5]} size='sm'>Make a choice:</Text>
                <Box className={classes.inner_container}>
                    <Box className={classes.options_container}>
                        {optionValues.map((option) => (
                            <Box key={option.value} className={classes.options_input_field}>
                                {type === 'Multiple Choice' ? (
                                    <Checkbox
                                        label={option.value}
                                        checked={selectedValues.includes(option.value)}
                                        onChange={(event) => {
                                            const newValues = event.currentTarget.checked
                                                ? [...selectedValues, option.value]
                                                : selectedValues.filter(v => v !== option.value);
                                            setSelectedValues(newValues);
                                        }}
                                        disabled={voted}
                                    />
                                ) : (
                                    <Radio
                                        label={option.value}
                                        checked={selectedValues.includes(option.value)}
                                        onChange={(event) => {
                                            const newValues = event.currentTarget.checked
                                                ? [option.value]
                                                : [];
                                            setSelectedValues(newValues);
                                        }}
                                        disabled={voted}
                                    />
                                )}
                            </Box>
                        ))}
                    </Box>
                    <Button variant='filled' onClick={handleVoteSubmit} disabled={voted}>Vote</Button>
                </Box>
            </Box>
        </Container >
    );
};