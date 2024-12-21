import { SendNuiMessage } from '../Utils/SendNuiMessage';
import { FC, useEffect, useState } from 'react';
import classes from './Results.module.css';
import { DEFAULT_THEME, Container, Box, Title, Text, Button, Divider } from '@mantine/core';
import { HandleNuiMessage } from '../Hooks/HandleNuiMessage';


SendNuiMessage([{ action: 'setVisibleResults', data: true }]);

export const Results: FC = () => { // Default to empty array if options is undefined
    const [title, setTitle] = useState<string>('');
    const [results, setResults] = useState<{ value: string, votes: number }[]>([]);
    const [totalVotes, setTotalVotes] = useState<number>(0);

    HandleNuiMessage<any>('setVisibleResults', (data) => {
        setTitle(data.title);
        setResults(data.options.map((option: string) => ({ value: option, votes: 0 }))); // Change to array of strings
        setTotalVotes(0);
    });

    useEffect(() => {
        // Dummy data
        const dummyOptions = [
            { value: 'ESX', votes: 10 },
            { value: 'QBCore', votes: 20 },
            { value: 'VRP', votes: 5 }
        ];
        setResults(dummyOptions);
        setTotalVotes(dummyOptions.reduce((sum, option) => sum + option.votes, 0));
    }, []);

    return (
        <Container className={classes.admin_container}>
            <Box className={classes.box_container} bg={DEFAULT_THEME.colors.dark[9]} opacity={0.8}>
                <Title c={DEFAULT_THEME.colors.gray[0]} order={1} align='center'>Which Framework is better?</Title>
                <Text c={DEFAULT_THEME.colors.gray[5]} size='sm'>Results:</Text>
                <Box className={classes.inner_container}>
                    <Box className={classes.options_container}>
                        {results.map((option, index) => (
                            <Box key={index} className={classes.option}>
                                <Box className={classes.option_header}>
                                    <Text c={DEFAULT_THEME.colors.gray[0]}>{option.value}</Text>
                                    <Text c={DEFAULT_THEME.colors.gray[5]}>
                                        {totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(2) : 0}% ({option.votes} votes)
                                    </Text>
                                </Box>
                                <Box className={classes.progress_bar} bg={DEFAULT_THEME.colors.gray[5]}>
                                    <Box
                                        className={classes.progress}
                                        bg={DEFAULT_THEME.colors.blue[5]}
                                        style={{ width: `${totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0}%` }}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Divider style={{ width: '100%' }} my="md" />
                <Box className={classes.footer}>
                    <Text c={DEFAULT_THEME.colors.gray[5]} size='md'>
                        Total Votes: {totalVotes}
                    </Text>
                    <Button variant='filled' className={classes.live_results_button}>Live Results</Button>
                </Box>
            </Box>
        </Container >
    );
};