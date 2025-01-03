import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';
import LoadSubtitlesIcon from '@project/common/components/LoadSubtitlesIcon';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import { ForwardedRef, useEffect, useState } from 'react';
import React from 'react';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface Props {
    show: boolean;
    canDownloadSubtitles: boolean;
    onLoadSubtitles: () => void;
    onDownloadSubtitles: () => void;
    onShowMiningHistory: () => void;
}

const SidePanelTopControls = React.forwardRef(function SidePanelTopControls(
    { show, canDownloadSubtitles, onLoadSubtitles, onDownloadSubtitles, onShowMiningHistory }: Props,
    ref: ForwardedRef<HTMLDivElement>
) {
    const { t } = useTranslation();
    const [forceShow, setForceShow] = useState<boolean>(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => setForceShow(false), 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Fade in={show || forceShow}>
            {/* Box type is missing ref support */}
            {/* @ts-ignore */}
            <Box ref={ref} style={{ position: 'absolute', top: 12, right: 12 }}>
                <Grid container direction="column">
                    <Grid item>
                        <Tooltip title={t('action.loadSubtitles')!}>
                            <IconButton onClick={onLoadSubtitles}>
                                <LoadSubtitlesIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    {canDownloadSubtitles && (
                        <Grid item>
                            <Tooltip title={t('action.downloadSubtitlesAsSrt')!}>
                                <IconButton onClick={onDownloadSubtitles}>
                                    <SaveAltIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    )}
                    <Grid item>
                        <IconButton onClick={onShowMiningHistory}>
                            <Tooltip title={t('bar.miningHistory')!}>
                                <HistoryIcon />
                            </Tooltip>
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Fade>
    );
});

export default SidePanelTopControls;
