import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { SocialEntity } from './social.entity';
import { socials } from '@prisma/client';
import { SocialService } from './social.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver()
export class SocialResolver {
  constructor(private readonly socialService: SocialService) {}

  @Query(() => [SocialEntity], { name: 'socials' })
  async getSocials(@Context() req: { user: number }): Promise<socials[]> {
    return await this.socialService.user_socials(req.user);
  }

  @Query(() => SocialEntity, { name: 'social' })
  async getSocial(
    @Context() req: { user: number },
    @Args('id') id: string,
  ): Promise<socials> {
    return await this.socialService.user_social(req.user, id);
  }
}
