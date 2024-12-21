import { SendNuiMessage } from '../Utils/SendNuiMessage';
import { FC, useEffect, useState } from 'react';
import classes from './Vote.module.css';
import { DEFAULT_THEME, Container, Box, Title, Text, Button, Checkbox, Radio, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HandleNuiMessage } from '../Hooks/HandleNuiMessage';

export const Vote: FC = () => {
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<string | null>('');
    const [optionValues, setOptionValues] = useState<Record<string, string>>({});
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [voted, setVoted] = useState<boolean>(false);

    const [opened, { open, close }] = useDisclosure(false);

    /* HandleNuiMessage<any>('setVisibleVote', (data) => {
        console.log(JSON.stringify(data));

        console.log(data.options);
        if (data.options && typeof data.options === 'object') {
            const formattedOptions = Object.entries(data.options).slice(0, 10).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>);

            setOptionValues(formattedOptions);
        } else {
            console.error("data.options is undefined or not an object");
            setOptionValues({});
        }
        setTitle(data.title || '');
        setType(data.type || '');
    }); */

    const handleVoteSubmit = () => {
        setVoted(true);
        open();
    };

    const handleShowResults = () => {
        close();
    };

    return (
        <Container className={classes.admin_container}>
            <Box className={classes.box_container} bg={DEFAULT_THEME.colors.dark[9]}>
                <Title c={DEFAULT_THEME.colors.gray[0]} order={1} align='center'>Which Framework is better?</Title>
                <Text c={DEFAULT_THEME.colors.gray[5]} size='sm'>Make a choice:</Text>
                <Box className={classes.inner_container}>
                    <Box className={classes.options_container}>
                        {/* {Object.entries(optionValues).map(([key, value]) => (
                            <Box key={key} className={classes.options_input_field}>
                                {type === 'multiple' ? (
                                    <Checkbox
                                        label={value}
                                        checked={selectedValues.includes(key)}
                                        onChange={(event) => {
                                            const newValues = event.currentTarget.checked
                                                ? [...selectedValues, key]
                                                : selectedValues.filter(v => v !== key);
                                            setSelectedValues(newValues);
                                        }}
                                        disabled={voted}
                                    />
                                ) : (
                                    <Radio
                                        label={value}
                                        value={key}
                                        checked={selectedValues.includes(key)}
                                        onChange={() => setSelectedValues([key])}
                                        disabled={voted}
                                    />
                                )}
                            </Box>
                        ))} */}
                    </Box>
                    <Button variant='filled' onClick={handleVoteSubmit} disabled={voted}>Vote</Button>
                </Box>
            </Box>
            <Modal opened={opened} onClose={close} title="Your vote has been submitted!" xOffset={0} centered>
                <Button variant='filled' onClick={handleShowResults}>See results</Button>
            </Modal>
        </Container >
    );
};