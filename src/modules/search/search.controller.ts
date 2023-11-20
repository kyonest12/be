import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AuthUser } from '../../auth/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { SearchDto } from './dto/search.dto';
import { GetSavedSearchDto } from './dto/get-saved-search.dto';
import { DeleteSavedSearchDto } from './dto/delete-saved-search.dto';

@Controller()
@ApiTags('Search')
@Auth()
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Post('/search')
    @HttpCode(200)
    async search(@AuthUser() user: User, @Body() body: SearchDto) {
        return this.searchService.search(user, body);
    }

    @Post('/get_saved_search')
    @HttpCode(200)
    async getSavedSearched(@AuthUser() user: User, @Body() body: GetSavedSearchDto) {
        return this.searchService.getSavedSearches(user, body);
    }

    @Post('/del_saved_search')
    @HttpCode(200)
    async deleteSavedSearch(@AuthUser() user: User, @Body() body: DeleteSavedSearchDto) {
        return this.searchService.deleteSavedSearch(user, body);
    }
}
