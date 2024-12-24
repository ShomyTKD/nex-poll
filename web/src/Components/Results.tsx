import { FC, useState } from 'react';
import classes from './Results.module.css';
import { DEFAULT_THEME, Container, Box, Title, Text, Button, Divider } from '@mantine/core';
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

export const Results: FC = () => {
    const [title, setTitle] = useState<string>('');
    const [results, setResults] = useState<{ value: string, votes: number }[]>([]);
    const [totalVotes, setTotalVotes] = useState<number>(0);

    const getPollData = () => {
        TriggerNuiCallback<PollData>('getPollData').then((data) => {
            if (data) {
                setTitle(data.title);
                setResults(data.options.map((option) => ({
                    value: option.value,
                    votes: option.count,
                })));
                setTotalVotes(data.options.reduce((total, option) => total + option.count, 0));
            }
        }).catch((error) => {
            console.error('Error fetching poll data:', error);
        })
    };

    HandleNuiMessage<any>('setVisibleResults', () => {
        getPollData();
    });

    return (
        <Container className={classes.main_container}>
            <Box className={classes.box_container} bg={DEFAULT_THEME.colors.dark[9]}>
                <Title c={DEFAULT_THEME.colors.gray[0]} order={1} align='center'>{title || 'No Poll Data'}</Title>
                <Text c={DEFAULT_THEME.colors.gray[5]} size='sm'>Results:</Text>
                <Box className={classes.inner_container}>
                    {results.length > 0 ? (
                        <Box className={classes.options_container}>
                            {results.map((option) => (
                                <Box key={option.value} className={classes.option}>
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
                    ) : (
                        <Text c={DEFAULT_THEME.colors.gray[5]}>No results available.</Text>
                    )}
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