export enum CreateEditType {
    create = "create",
    edit = "edit",
}

export interface CreateEditProps {
    header: string;
    showCreateEditModel: boolean;
    createEditBtnContent: string;
    type: CreateEditType;
    loading?: boolean;
    children: React.ReactNode;
    confirmCreateEditHandler: (type: boolean) => void;
}

export enum ReivewSettingsType {
    colse = "close",
    edit = "edit",
    delete = "delete",
}

export interface ReivewSettingsProps {
    showReivewSettingsModel: boolean;
    closeModel: (type: ReivewSettingsType) => void;
}

export interface ConfirmDeleteProps {
    header: string;
    element?: string;
    text: string;
    loading?: boolean;
    showDeleteModel: boolean;
    confirmDeleteHandler: (type: boolean) => void;
    deleteBtnContent: string;
}

export interface ConfirmProps {
    header: string;
    element?: string;
    text: string;
    loading?: boolean;
    showConfrimModel: boolean;
    confirmHandler: (type: boolean) => void;
    confirmBtnContent: string;
}
