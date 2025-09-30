import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Attributes, PrefsContextType, PrefProviderProps } from '@lib/types';

let initPrefs = {
    theme: 'light',
    defaultLeftPanelSize: 25,
    defaultRightPanelSize: 20,
    positionComps: 15,
    positionProps: 70,
    positionTypes: 50,
    positionGroups: 25,
    positionTools: 25,
    positionMeta: 25,
    positionModel: 25,
    metaRecordsView: 'flow', // grid|flow
    metaEditor: 'form', // json|form|tabs
    modelEditor: 'form',
    designEditor: 'blocks'// json|blocks
}

const PrefsContext = createContext<PrefsContextType | undefined>(undefined);

export function PrefProvider({ children }: PrefProviderProps):React.ReactNode {
    let [prefs, _setPrefs] = useState<Attributes>({});

    const setPrefs = (p: Attributes) => {
        console.log('setPrefs', p);
        const prefs = { ...getPrefs(), ...p }
        localStorage.setItem("prefs", JSON.stringify(prefs));
        _setPrefs(prefs)
    }

    function getPrefs() {
        const str = localStorage.getItem("prefs");
        return str ? { ...initPrefs, ...JSON.parse(str) } : initPrefs
    }

    useEffect(() => {
        const prefs = getPrefs();
        _setPrefs(prefs);
    }, []);

    const value: PrefsContextType = { prefs, setPrefs };

    if(Object.keys(prefs).length === 0) {
        return null;
    }

    return (
        <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
    );
}

export function usePrefs(): PrefsContextType {
    const context = useContext(PrefsContext);
    if (context === undefined) {
        throw new Error('usePrefs must be used within an PrefProvider');
    }
    return context;
}