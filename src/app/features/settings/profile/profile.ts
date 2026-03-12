import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { toast } from 'ngx-sonner';
import { HlmButtonImports } from '@spartan/button';
import { HlmInputImports } from '@spartan/input';
import { HlmLabelImports } from '@spartan/label';
import { HlmSeparatorImports } from '@spartan/separator';
import { HlmSpinnerImports } from '@spartan/spinner';

import { AuthService } from '../../../shared/services/auth.service';
import { ProfileService } from '../../../shared/services/profile.service';

@Component({
    selector: 'app-settings-profile',
    templateUrl: './profile.html',
    imports: [HlmButtonImports, HlmInputImports, HlmLabelImports, HlmSeparatorImports, HlmSpinnerImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsProfilePage {
    private readonly profileService = inject(ProfileService);

    protected readonly user = inject(AuthService).user;
    protected readonly profile = this.profileService.profile;

    protected readonly displayName = linkedSignal(
        () => this.profileService.profile.value()?.display_name ?? '',
    );

    protected updateDisplayName(event: Event): void {
        this.displayName.set((event.target as HTMLInputElement).value);
    }

    protected async save(): Promise<void> {
        const { error } = await this.profileService.update(this.displayName());
        if (error) {
            toast.error(error);
            return;
        }
        toast.success('Profile updated');
    }
}
