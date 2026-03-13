import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    linkedSignal,
    signal,
    ViewChild,
} from '@angular/core';
import Cropper from 'cropperjs';
import { HlmDialog } from '@spartan/dialog';
import { toast } from 'ngx-sonner';
import { HlmAvatarImports } from '@spartan/avatar';
import { HlmButtonImports } from '@spartan/button';
import { HlmDialogImports } from '@spartan/dialog';
import { HlmInputImports } from '@spartan/input';
import { HlmLabelImports } from '@spartan/label';
import { HlmSeparatorImports } from '@spartan/separator';
import { HlmSpinnerImports } from '@spartan/spinner';
import { HlmTextareaImports } from '@spartan/textarea';

import { AuthService } from '../../../shared/services/auth.service';
import { ProfileService } from '../../../shared/services/profile.service';

@Component({
    selector: 'app-settings-profile',
    templateUrl: './profile.html',
    imports: [
        HlmAvatarImports,
        HlmButtonImports,
        HlmDialogImports,
        HlmInputImports,
        HlmLabelImports,
        HlmSeparatorImports,
        HlmSpinnerImports,
        HlmTextareaImports,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsProfilePage {
    private readonly profileService = inject(ProfileService);

    @ViewChild('avatarDialog') private avatarDialog!: HlmDialog;

    protected readonly user = inject(AuthService).user;
    protected readonly profile = this.profileService.profile;

    protected readonly userInitials = computed(() => {
        const displayName = this.profileService.profile.value()?.display_name?.trim();
        if (displayName) {
            const parts = displayName.split(/\s+/);
            if (parts.length >= 2) {
                return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
            }
            return displayName.slice(0, 2).toUpperCase();
        }
        return (this.user()?.email ?? '').slice(0, 2).toUpperCase();
    });

    protected readonly displayName = linkedSignal(
        () => this.profileService.profile.value()?.display_name ?? '',
    );
    protected readonly bio = linkedSignal(() => this.profileService.profile.value()?.bio ?? '');

    protected readonly cropperImageSrc = signal<string | null>(null);
    protected readonly isSavingAvatar = signal(false);

    private cropper: Cropper | null = null;

    protected updateDisplayName(event: Event): void {
        this.displayName.set((event.target as HTMLInputElement).value);
    }

    protected updateBio(event: Event): void {
        this.bio.set((event.target as HTMLTextAreaElement).value);
    }

    protected onFileSelected(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => this.cropperImageSrc.set(e.target?.result as string);
        reader.readAsDataURL(file);
    }

    protected onImageLoaded(event: Event): void {
        this.cropper?.destroy();
        this.cropper = new Cropper(event.target as HTMLImageElement, {
            aspectRatio: 1,
            viewMode: 1,
            dragMode: 'move',
            autoCropArea: 1,
            restore: false,
            guides: false,
            center: false,
            highlight: false,
            cropBoxMovable: false,
            cropBoxResizable: false,
            toggleDragModeOnDblclick: false,
        });
    }

    protected saveAvatar(): void {
        if (!this.cropper) return;
        this.isSavingAvatar.set(true);
        this.cropper.getCroppedCanvas({ width: 512, height: 512 }).toBlob(
            async (blob) => {
                if (!blob) {
                    this.isSavingAvatar.set(false);
                    toast.error('Failed to process image');
                    return;
                }
                const { error } = await this.profileService.uploadAvatar(blob);
                this.isSavingAvatar.set(false);
                if (error) {
                    toast.error(error);
                    return;
                }
                toast.success('Profile photo updated');
                this.closeAvatarDialog();
            },
            'image/jpeg',
            0.85,
        );
    }

    protected closeAvatarDialog(): void {
        this.avatarDialog?.close();
        this.cropperImageSrc.set(null);
        this.cropper?.destroy();
        this.cropper = null;
    }

    protected async save(): Promise<void> {
        const { error } = await this.profileService.update(this.displayName(), this.bio());
        if (error) {
            toast.error(error);
            return;
        }
        toast.success('Profile updated');
    }
}
