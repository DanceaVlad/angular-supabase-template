import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { toast } from 'ngx-sonner';
import { HlmButtonImports } from '@spartan/button';
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
        HlmButtonImports,
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

    protected readonly user = inject(AuthService).user;
    protected readonly profile = this.profileService.profile;

    protected readonly displayName = linkedSignal(
        () => this.profileService.profile.value()?.display_name ?? '',
    );
    protected readonly bio = linkedSignal(() => this.profileService.profile.value()?.bio ?? '');

    protected updateDisplayName(event: Event): void {
        this.displayName.set((event.target as HTMLInputElement).value);
    }

    protected updateBio(event: Event): void {
        this.bio.set((event.target as HTMLTextAreaElement).value);
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
