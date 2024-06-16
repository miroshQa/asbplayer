import {
    BlurSubtitlesMessage,
    Command,
    ExtensionToVideoCommand,
    Message,
    SettingsUpdatedMessage,
} from '@project/common';
import {
    SettingsProvider,
    SubtitleSettings,
    changeForTextSubtitleSetting,
    subtitleSettingsKeys,
    textSubtitleSettingsForTrack,
} from '@project/common/settings';
import TabRegistry from '../../services/tab-registry';

export default class BlurSubtitlesHandler {
    private readonly settings: SettingsProvider;
    private readonly tabRegistry: TabRegistry;

    constructor(settings: SettingsProvider, tabRegistry: TabRegistry) {
        this.settings = settings;
        this.tabRegistry = tabRegistry;
    }

    get sender() {
        return 'asbplayer-video';
    }

    get command() {
        return 'blur-subtitles';
    }

    async handle(command: Command<Message>, sender: chrome.runtime.MessageSender) {
        const message = command.message as BlurSubtitlesMessage;
        const subtitleSettings: SubtitleSettings = await this.settings.get(subtitleSettingsKeys);
        const oldValue = textSubtitleSettingsForTrack(subtitleSettings, message.track);
        const change = changeForTextSubtitleSetting(
            { subtitleBlur: !oldValue.subtitleBlur },
            subtitleSettings,
            message.track
        );
        await this.settings.set(change);

        this.tabRegistry.publishCommandToVideoElements((videoElement) => {
            const settingsUpdatedCommand: ExtensionToVideoCommand<SettingsUpdatedMessage> = {
                sender: 'asbplayer-extension-to-video',
                message: {
                    command: 'settings-updated',
                },
                src: videoElement.src,
            };
            return settingsUpdatedCommand;
        });
    }
}
